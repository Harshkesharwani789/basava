import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Tabs,
  Tab,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { TbBrandDatabricks } from "react-icons/tb";
import { TbBrandLoom } from "react-icons/tb";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import { Card, CardContent } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { toast, ToastContainer } from "react-toastify";

const API_URL = "https://basavamart.in/api/product";

const Products = () => {
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [openBrandDialog, setOpenBrandDialog] = useState(false);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [currentBrand, setCurrentBrand] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentSubCategory, setCurrentSubCategory] = useState(null);
  const [value, setValue] = useState("brands");
  const [brandImg, setBrandImg] = useState(null);
  const [categoryImg, setCategoryImg] = useState(null);
  const [subCategoryImg, setSubCategoryImg] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [openSubCategoryDialog, setOpenSubCategoryDialog] = useState(false);
  const [selectCategory, setSelectCategory] = useState("");
  const handleBrandImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setBrandImg(selectedFile);
      // setPreviewImage(URL.createObjectURL(selectedFile));
    }
  };

  const handleCategoryImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setCategoryImg(selectedFile);
    }
  };
  const handleSubCategoryImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setSubCategoryImg(selectedFile);
    }
  };

  const brandColumns = [
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
      renderCell: (params) => (
        <Box>
          <Tooltip title="Edit" placement="left" arrow>
            <IconButton
              sx={{ color: "#F17D01" }}
              size="small"
              onClick={() => handleEditBrand(params.row)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete" placement="right" arrow>
            <IconButton
              color="error"
              size="small"
              onClick={() => handleDeleteBrand(params.row._id)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
    {
      field: "name",
      headerName: "Brand Name",
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },
    {
      field: "img",
      headerName: "Brand Image",
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
      renderCell: (params) => (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
        >
          <img
            src={`https://basavamart.in${params.value}`}
            alt="Brand"
            style={{
              width: "90px",
              height: "75px",
              objectFit: "contain",
              borderRadius: "6px",
            }}
          />
        </Box>
      ),
    },
    {
      field: "_id",
      headerName: "Brand ID",
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },
  ];
  const categoryColumns = [
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
      renderCell: (params) => (
        <Box>
          <Tooltip title="Edit" placement="left" arrow>
            <IconButton
              sx={{ color: "#F17D01", mx: "18px" }}
              size="small"
              onClick={() => handleEditCategory(params.row)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete" placement="right" arrow>
            <IconButton
              color="error"
              size="small"
              onClick={() => handleDeleteCategory(params.row._id)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
    {
      field: "name",
      headerName: "Category Name",
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },
    {
      field: "img",
      headerName: "Category Image",
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
      renderCell: (params) => (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
        >
          <img
            src={`https://basavamart.in${params.value}`}
            alt="Category"
            style={{
              width: "90px",
              height: "75px",
              objectFit: "contain",
              borderRadius: "6px",
            }}
          />
        </Box>
      ),
    },
    {
      field: "_id",
      headerName: "Category ID",
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },
  ];
  const subCategoryColumns = [
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
      renderCell: (params) => (
        <Box>
          <Tooltip title="Edit" placement="left" arrow>
            <IconButton
              sx={{ color: "#F17D01", mx: "18px" }}
              size="small"
              onClick={() => handleEditSubCategory(params.row)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete" placement="right" arrow>
            <IconButton
              color="error"
              size="small"
              onClick={() => handleDeleteSubCategory(params.row._id)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
      valueGetter: (params, row) => {
        return row.category ? row.category.name : "No Category";
      },
    },
    {
      field: "name",
      headerName: "Sub Category Name",
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },
    {
      field: "img",
      headerName: "Sub Category Image",
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
      renderCell: (params) => (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
        >
          <img
            src={`https://basavamart.in${params.value}`}
            alt="Sub Category"
            style={{
              width: "90px",
              height: "75px",
              objectFit: "contain",
              borderRadius: "6px",
            }}
          />
        </Box>
      ),
    },
    {
      field: "_id",
      headerName: "Sub Category ID",
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },
  ];

  const handleAddBrand = () => {
    setCurrentBrand(null);
    setOpenBrandDialog(true);
  };

  const handleEditBrand = (brand) => {
    setCurrentBrand(brand);
    setOpenBrandDialog(true);
  };

  const handleDeleteBrand = async (id) => {
    try {
      await axios.delete(`${API_URL}/deletebrand/${id}`);
      setBrands(brands.filter((brand) => brand._id !== id));
    } catch {
      console.error("Error deleting brand");
    }
  };

  const handleCloseBrandDialog = () => {
    setOpenBrandDialog(false);
    setCurrentBrand(null);
  };

  const handleSubmitBrand = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", e.target.name.value);
    if (brandImg) {
      formData.append("img", brandImg);
    }

    if (currentBrand) {
      try {
        const response = await axios.put(
          `${API_URL}/updatebrand/${currentBrand._id}`,
          formData
        );
        setBrands(
          brands.map((brand) =>
            brand._id === currentBrand._id ? response.data : brand
          )
        );
        toast.success("Brand Updated Successfully");
      } catch (err) {
        console.error("Error updating brand", err);
      }
    } else {
      try {
        const response = await axios.post(`${API_URL}/addbrand`, formData);
        setBrands([...brands, response.data]);
        toast.success("Brand Added Successfully");
      } catch (err) {
        console.error("Error adding brand", err);
      }
    }
    handleCloseBrandDialog();
  };

  const handleAddSubCategory = () => {
    setOpenSubCategoryDialog(true);
    setSubCategory(null);
  };

  const handleAddCategory = () => {
    setCurrentCategory(null);
    setOpenCategoryDialog(true);
  };

  const handleEditCategory = (category) => {
    setCurrentCategory(category);
    setOpenCategoryDialog(true);
  };

  const handleEditSubCategory = (subcat) => {
    setSubCategory(subcat);
    setCurrentSubCategory(subcat);
    setOpenSubCategoryDialog(true);
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`${API_URL}/deletecategory/${id}`);
      setCategories(categories.filter((category) => category._id !== id));
    } catch {
      console.error("Error deleting category");
    }
  };

  const handleDeleteSubCategory = async (id) => {
    try {
      await axios.delete(`${API_URL}/deletesubcategory/${id}`);
      setSubCategories(subCategories.filter((subcat) => subcat._id !== id));
    } catch {
      console.error("Error deleting subcategory");
    }
  };

  const handleCloseCategoryDialog = () => {
    setOpenCategoryDialog(false);
    setCurrentCategory(null);
  };

  const handleCloseSubCategoryDialog = () => {
    setOpenSubCategoryDialog(false);
    setSubCategory(null);
  };

  const handleSubmitCategory = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", e.target.name.value);
    if (categoryImg) {
      formData.append("img", categoryImg);
    }
    // const newCategory = {
    //   name: formData.get("name"),
    //   subcat: formData.get("subcat"),
    // };

    if (currentCategory) {
      try {
        const response = await axios.put(
          `${API_URL}/updatecategory/${currentCategory._id}`,
          formData
        );
        setCategories(
          categories.map((category) =>
            category._id === currentCategory._id ? response.data : category
          )
        );
        toast.success("Category Updated Successfully");
      } catch {
        console.error("Error updating category");
      }
    } else {
      try {
        const response = await axios.post(`${API_URL}/addcategory`, formData);
        setCategories([...categories, response.data]);
        toast.success("Category Added Successfully");
      } catch {
        console.error("Error adding category");
      }
    }
    handleCloseCategoryDialog();
  };

  const handleSubmitSubCategory = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", e.target.name.value);
    formData.append("category", selectCategory);
    if (subCategoryImg) {
      formData.append("img", subCategoryImg);
    }
    console.log("FormData:", [...formData.entries()]);
    if (currentSubCategory) {
      try {
        const response = await axios.put(
          `${API_URL}/updatesubcategory/${subCategory._id}`,
          formData
        );
        setSubCategory(
          subCategory.map((subcategory) =>
            subcategory._id === subCategory._id ? response.data : subCategory
          )
        );
        setCurrentSubCategory(null)
        toast.success("Sub Category Updated Successfully");
      } catch {
        console.error("Error updating subcategory");
      }
    } else {
      try {
        const response = await axios.post(
          `${API_URL}/addsubcategory`,
          formData
        );
        if (response.status === 200) {
          fetchSubCategory();
          toast.success("Sub Category Added Successfully");
        }
      } catch {
        console.error("Error adding subcategory");
      }
    }
    handleCloseSubCategoryDialog();
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchBrand = async () => {
    try {
      const response = await axios.get(`${API_URL}/getbrand`);
      setBrands(response.data);
    } catch {
      console.error("Failed to fetch brands");
    }
  };
  const fetchCategory = async () => {
    try {
      const response = await axios.get(`${API_URL}/getcategory`);
      setCategories(response.data);
    } catch {
      console.error("Failed to fetch categories");
    }
  };

  const fetchSubCategory = async () => {
    try {
      const response = await axios.get(`${API_URL}/getsubcategory`);
      setSubCategories(response.data);
    } catch {
      console.error("Failed to fetch subcategories");
    }
  };

  useEffect(() => {
    fetchBrand();
    fetchCategory();
    fetchSubCategory();
  }, []);

  return (
    <>
      <ToastContainer />
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleTabChange}
          sx={{
            "& .MuiTab-root": {
              color: "black",
            },
            "& .Mui-selected": {
              color: "#F17D01",
              fontWeight: "bold",
            },
          }}
        >
          <Tab
            value="brands"
            label="Brands"
            icon={<TbBrandLoom style={{ fontSize: "24px" }} />}
            sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}
          />
          <Tab
            value="categories"
            label="Categories"
            icon={<TbBrandDatabricks style={{ fontSize: "24px" }} />}
            sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}
          />
          <Tab
            value="subcategory"
            label="Sub Categories"
            icon={<TbBrandDatabricks style={{ fontSize: "24px" }} />}
            sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}
          />
        </Tabs>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={2}
        >
          {value === "brands" && (
            <Button
              variant="contained"
              sx={{ backgroundColor: "#F17D01", marginBottom: "6px" }}
              onClick={handleAddBrand}
              startIcon={<AddIcon />}
            >
              Add Brand
            </Button>
          )}
          {value === "categories" && (
            <Button
              variant="contained"
              sx={{ backgroundColor: "#F17D01", marginBottom: "6px" }}
              onClick={handleAddCategory}
              startIcon={<AddIcon />}
            >
              Add Category
            </Button>
          )}
          {value === "subcategory" && (
            <Button
              variant="contained"
              sx={{ backgroundColor: "#F17D01", marginBottom: "6px" }}
              onClick={handleAddSubCategory}
              startIcon={<AddIcon />}
            >
              Add Sub Category
            </Button>
          )}
        </Box>

        {value === "brands" && (
          <div style={{ height: 600, width: "100%", margin: "24px 0px" }}>
            <DataGrid
              rows={brands}
              columns={brandColumns}
              pageSize={5}
              getRowId={(row) => row._id}
              sx={{ color: "black" }}
              hideFooter
              disableRowSelectionOnClick
            />
          </div>
        )}

        {value === "categories" && (
          <div style={{ height: 600, width: "100%", margin: "24px 0px" }}>
            <DataGrid
              rows={categories}
              columns={categoryColumns}
              pageSize={5}
              getRowId={(row) => row._id}
              sx={{ color: "black" }}
              hideFooter
              disableRowSelectionOnClick
            />
          </div>
        )}
        {value === "subcategory" && (
          <div style={{ height: 600, width: "100%", margin: "24px 0px" }}>
            <DataGrid
              rows={subCategories}
              columns={subCategoryColumns}
              pageSize={5}
              getRowId={(row) => row._id}
              sx={{ color: "black" }}
              hideFooter
              disableRowSelectionOnClick
            />
          </div>
        )}

        {/* Brand Dialog */}
        <Dialog open={openBrandDialog} onClose={handleCloseBrandDialog}>
          <DialogTitle>{currentBrand ? "Edit Brand" : "Add Brand"}</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmitBrand}>
              <TextField
                autoFocus
                margin="dense"
                name="name"
                label="Brand Name"
                fullWidth
                defaultValue={currentBrand ? currentBrand.name : ""}
                required
              />
              <input
                type="file"
                name="img"
                accept="image/*"
                onChange={handleBrandImageChange}
                required={!currentBrand}
              />
              {/* {previewImage && (
                <img src={previewImage} alt="Preview" width="100" />
              )} */}
              <DialogActions>
                <Button onClick={handleCloseBrandDialog} color="primary">
                  Cancel
                </Button>
                <Button type="submit" color="primary">
                  {currentBrand ? "Update" : "Add"}
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>

        {/* Category Dialog */}
        <Dialog open={openCategoryDialog} onClose={handleCloseCategoryDialog}>
          <DialogTitle>
            {currentCategory ? "Edit Category" : "Add Category"}
          </DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmitCategory}>
              <TextField
                autoFocus
                margin="dense"
                name="name"
                label="Category Name"
                fullWidth
                defaultValue={currentCategory ? currentCategory.name : ""}
                required
              />
              <input
                type="file"
                name="img"
                accept="image/*"
                onChange={handleCategoryImageChange}
                required={!currentCategory}
              />
              <DialogActions>
                <Button onClick={handleCloseCategoryDialog} color="primary">
                  Cancel
                </Button>
                <Button type="submit" color="primary">
                  {currentCategory ? "Update" : "Add"}
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>

        {/* Sub Category Dialog */}
        <Dialog
          open={openSubCategoryDialog}
          onClose={handleCloseSubCategoryDialog}
        >
          <DialogTitle>
            {currentCategory ? "Edit Category" : "Add Category"}
          </DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmitSubCategory}>
              <FormControl fullWidth margin="dense">
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  label="Category"
                  value={selectCategory}
                  onChange={(e) => setSelectCategory(e.target.value)}
                  required
                >
                  {categories.map((category) => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                autoFocus
                margin="dense"
                name="name"
                label="Sub Category Name"
                fullWidth
                defaultValue={currentSubCategory ? currentSubCategory.name : ""}
                required
              />
              <input
                type="file"
                name="img"
                accept="image/*"
                onChange={handleSubCategoryImageChange}
                required={!currentSubCategory}
              />
              <DialogActions>
                <Button onClick={handleCloseSubCategoryDialog} color="primary">
                  Cancel
                </Button>
                <Button type="submit" color="primary">
                  {subCategory ? "Update" : "Add"}
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
};

export default Products;
