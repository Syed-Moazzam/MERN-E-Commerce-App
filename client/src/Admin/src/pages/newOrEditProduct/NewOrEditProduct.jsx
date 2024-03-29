import "./newOrEditProduct.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import {
  createProduct,
  getSingleProduct,
  updateProduct,
} from "../../../../api";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const NewOrEditProduct = ({ inputs, title }) => {
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [product, setProduct] = useState({
    id: "",
    title: "",
    actual_price: "",
    crossed_price: "",
    manufacturer: "",
    country: "",
    category: "",
    sub_category: "",
  });
  const param = useParams();
  const toast = useToast();

  useEffect(() => {
    if (title !== "Add New Product") {
      let id = param.productId;
      getSingleProduct(id)
        .then((res) => {
          if (res.data.product) {
            let prod = res.data.product;
            setProduct({
              id: prod.id,
              title: prod.title,
              actual_price: prod.actual_price,
              crossed_price: prod.crossed_price,
              manufacturer: prod.manufacturer,
              country: prod.country ? prod.country : "",
              category: prod.category,
              sub_category: prod.sub_category,
            });
            let img = [];
            if (prod.img1) {
              img.push(prod.img1);
            }
            if (prod.img2) {
              img.push(prod.img2);
            }
            if (prod.img3) {
              img.push(prod.img3);
            }
            setImagePreview(img);
            setImages(img);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const navigate = useNavigate();

  const handleProductChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const onSave = (e) => {
    e.preventDefault();
    if (title !== "Add New Product") {
      let id = param.productId;
      updateProduct(id, product)
        .then((res) => {
          console.log(res);
          toast({
            title: "Product Updated Successfully!",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
          navigate("/admin/products");
        })
        .catch((err) => console.log(err));
    } else {
      let newProduct = {
        ...product,
        id: Number(product.id),
        actual_price: Number(product.actual_price),
        crossed_price: Number(product.crossed_price),
        country: "",
        images,
      };
      createProduct(newProduct)
        .then((res) => {
          console.log(res);
          toast({
            title: "Doctor Addedd Successfully!",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
          navigate("/admin/products");
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    }
  };

  const handleOnChange = (e) => {
    const files = Array.from(e.target.files);
    setImagePreview([]);
    setImages([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <div className="top">
          <h1>{title ? title : product.title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <div id="product_image">
              {imagePreview && imagePreview.length > 0 ? (
                <Carousel pause="hover">
                  {imagePreview.map((url) => {
                    return (
                      <Carousel.Item>
                        <img
                          style={{ objectFit: "contain" }}
                          className="d-block w-100"
                          alt="img"
                          src={url}
                        />
                      </Carousel.Item>
                    );
                  })}
                </Carousel>
              ) : (
                <p>Please upload product images</p>
              )}
            </div>
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={handleOnChange}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    name={input.name}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleProductChange}
                    value={product[input.name]}
                  />
                </div>
              ))}
              <button onClick={onSave}>Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewOrEditProduct;
