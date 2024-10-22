import "./CreateProductArea.scss";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../../firebase";
import { addProduct } from "../../redux/ApiCalls";
import { useDispatch } from "react-redux";
const CreateProductArea = ({ productType }) => {
  const [colors, setColors] = useState([]);
  const [currentColors, setCurrentColors] = useState("");
  const [file, setFile] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const dispatch = useDispatch();

  const handleColorChange = (e) => {
    setCurrentColors(e.target.value);
  };
  const addColor = () => {
    if (colors.length < 6) {
      setColors([...colors, currentColors]);
      setCurrentColors("");
    }
  };
  const handleDeleteColor = (index) => {
    const updatedColor = [...colors];
    updatedColor.splice(index, 1);
    setColors(updatedColor);
  };

  const navigate = useNavigate();

  //validation Schema
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    price: Yup.string().required("Price is required"),
    battery: Yup.string().required("Battery life is required"),
    brand: Yup.string().required("Brand is required"),
    quantity: Yup.string().required("Quantity is required"),
    desc: Yup.string().required("Description is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const showToast = (message) => {
    toast.error(message, {
      theme: "colored",
      pauseOnFocusLoss: false,
      toastId: 1,
    });
  };
  const handleUpload = async () => {
    return new Promise((resolve, reject) => {
      if (!file) {
        showToast("Image is required");
        reject();
      }
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          showToast("Failed to upload image");
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImgUrl(downloadURL);
            resolve(downloadURL);
          });
        }
      );
    });
  };
  const handleCreate = async (data) => {
    try {
      const imgUrl = await handleUpload();
      if (imgUrl) {
        const newProduct = {
          ...data,
          colors,
          category: productType,
          img: imgUrl,
        };
        addProduct(dispatch, newProduct);
        navigate("/product");
        toast.success("Product created successfully!");
      }
    } catch (error) {}
  };

  return (
    <div className="createProductArea">
      <div className="header">
        <h3>Add Product</h3>
        <button onClick={() => navigate("/product")}>View All</button>
      </div>
      <hr />

      <div className="createArea">
        <div className="imageSelector">
          <label htmlFor="file">
            <AddPhotoAlternateIcon className="imgSelect" />
          </label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          {file && (
            <div className="file">
              <img src={URL.createObjectURL(file)} alt="" />
              <DeleteIcon className="delete" onClick={() => setFile(null)} />
            </div>
          )}
        </div>
        <div className="variantArea">
          <div className="defaultVariant">
            <div className="inputItem">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                placeholder="Title"
                id="title"
                {...register("title")}
              />
              {errors.title && showToast(errors.title.message)}
            </div>{" "}
            <div className="inputItem">
              <label htmlFor="Price">Price:</label>
              <input
                type="number"
                placeholder="Price"
                id="price"
                min={0}
                {...register("price")}
              />
              {errors.price && showToast(errors.price.message)}
            </div>{" "}
            <div className="inputItem">
              <label htmlFor="Battery">Battery Life:</label>
              <input
                type="number"
                placeholder="Battery"
                id="Battery"
                min={0}
                {...register("battery")}
              />
              {errors.battery && showToast(errors.battery.message)}
            </div>{" "}
            <div className="inputItem">
              <label htmlFor="Brand">Brand:</label>
              <input
                type="text"
                placeholder="Brand"
                id="brand"
                {...register("brand")}
              />
              {errors.brand && showToast(errors.brand.message)}
            </div>{" "}
            <div className="inputItem">
              <label htmlFor="Quantity">Quantity:</label>
              <input
                type="number"
                placeholder="Quantity"
                id="Quantity"
                min={0}
                {...register("quantity")}
              />
              {errors.quantity && showToast(errors.quantity.message)}
            </div>{" "}
          </div>
          <div className="description">
            <label htmlFor="description">Description</label>
            <textarea
              name="desc"
              id="desc"
              placeholder="Description"
              rows={8}
              {...register("desc")}
            ></textarea>
            {errors.desc && showToast(errors.desc.message)}
          </div>
          <div className="colorArea">
            <div className="inputItem">
              <label htmlFor="Color">Color:</label>
              <input
                type="color"
                placeholder="Color"
                id="Color"
                className="colorInput"
                value={currentColors}
                onChange={handleColorChange}
              />
              <button onClick={addColor}>Add</button>
            </div>{" "}
            <div className="colors">
              {colors &&
                colors.map((color, index) => {
                  return (
                    <div
                      key={index}
                      className="colorItem"
                      style={{
                        backgroundColor: `${color}`,
                      }}
                      onClick={() => handleDeleteColor(index)}
                    >
                      <DeleteIcon className="delete" />
                    </div>
                  );
                })}
            </div>
          </div>
          <button className="createButton" onClick={handleSubmit(handleCreate)}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProductArea;
