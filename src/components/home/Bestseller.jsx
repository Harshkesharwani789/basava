import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShoppingBag, ArrowRight } from "lucide-react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Rating,
  Button,
  IconButton,
  Chip,
  Skeleton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { getTokenFromCookie } from "../../utils/handleToken";

const API_URL = "https://basavamart.in/api/product";

const ProductCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  borderRadius: theme.spacing(2),
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: theme.shadows[4],
  },
}));

const DiscountChip = styled(Chip)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(1),
  right: theme.spacing(1),
  zIndex: 10,
  backgroundColor: theme.palette.warning.main,
  color: theme.palette.common.white,
}));

const ProductImage = styled(CardMedia)(({ theme }) => ({
  height: 0,
  paddingTop: "100%", // 1:1 aspect ratio
  position: "relative",
}));

const Bestseller = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/shop-detail/${id}`);
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const token = getTokenFromCookie();
      const response = await axios.get(`${API_URL}/getproduct`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProducts(response.data.slice(0, 18));
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const ProductImagePlaceholder = () => (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "grey.200",
        color: "grey.500",
      }}
    >
      <Typography variant="body2">Image Not Found</Typography>
    </Box>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{
            color: "text.secondary",
            fontWeight: "bold",
          }}
        >
          Best Sellers
        </Typography>
        <Button
          variant="contained"
          color="warning"
          endIcon={<ArrowRight />}
          component={React.forwardRef((props, ref) => (
            <Link to="/shop" ref={ref} {...props} />
          ))}
        >
          View More
        </Button>
      </Box>

      <Typography
        variant="body1"
        align="center"
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Discover our top-performing products that customers love
      </Typography>

      <Grid container spacing={3}>
        {loading
          ? Array.from(new Array(18)).map((_, index) => (
              <Grid item key={index} xs={6} sm={4} md={3} lg={2}>
                <Skeleton
                  variant="rectangular"
                  height={300}
                  sx={{ borderRadius: 2 }}
                />
              </Grid>
            ))
          : products?.map((item) => (
              <Grid item key={item._id} xs={6} sm={4} md={3} lg={2}>
                <ProductCard onClick={() => handleClick(item._id)}>
                  {item.variants[0]?.discount && (
                    <DiscountChip label={`${item?.variants[0]?.discount}% OFF`} />
                  )}
                  <ProductImage
                    title={item?.productName}
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentNode.innerHTML = `
                        <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: flex; justify-content: center; align-items: center; background-color: #f0f0f0; color: #888;">
                          Image Not Found
                        </div>
                      `;
                    }}
                    image={`https://basavamart.in${item?.images[0]}`}
                  >
                    {!item.images || item.images.length === 0 ? (
                      <ProductImagePlaceholder />
                    ) : null}
                  </ProductImage>

                  <CardContent sx={{ flexGrow: 1, p: 2 }}>
                    <Typography
                      variant="subtitle1"
                      component="h3"
                      noWrap
                      sx={{ fontWeight: "medium", mb: 1 }}
                    >
                      {item?.productName}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Rating
                        name="product-rating"
                        value={4}
                        readOnly
                        size="small"
                      />
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontWeight: "bold" }}
                      >
                        ₹{item?.variants[0]?.finalPrice.toFixed(0)}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Button
                        variant="contained"
                        color="warning"
                        startIcon={<ShoppingBag size={20} />}
                        fullWidth
                        sx={{
                          borderRadius: 2,
                          textTransform: "none",
                        }}
                      >
                        Add to Cart
                      </Button>
                    </Box>
                  </CardContent>
                </ProductCard>
              </Grid>
            ))}
      </Grid>
    </Container>
  );
};

export default Bestseller;
