import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs";

export const createProductController = async (req, res) => {
  try {
    const { name, description, slug, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    switch (true) {
      case !name:
        return res.status(500).send({ error: "name is required" });
      case !description:
        return res.status(500).send({ error: "description is required" });
      case !price:
        return res.status(500).send({ error: "price is required" });
      case !category:
        return res.status(500).send({ error: "category is required" });
      case !quantity:
        return res.status(500).send({ error: "quantity is required" });
      case !photo && photo.size > 10000:
        return res
          .status(500)
          .send({ error: "photo is required and should be less than 1 mb" });
    }

    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product created Succesfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "product creation failed",
      error,
    });
  }
};

export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate('category')
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res
      .status(200)
      .send({
        countTotal: products.length,
        success: true,
        message: "All products",
        products,
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting product",
      error: error.message,
    });
  }
};

export const getSingleProductController = async (req, res) => {
    try {
      const product = await productModel
        .findOne({slug:req.params.slug}).select("-photo").populate("category")
      res
        .status(200)
        .send({ 
          success: true,
          message: "Single product fetched ",
          product,
        });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in getting product",
        error: error.message,
      });
    }
  };

  export const productPhotoController = async (req, res) => {
    try {
      const product = await productModel.findById(req.params.pid).select("photo")
      if(product.photo.data){
        res.set('Content-type',product.photo.contentType)
        return res.status(200).send(
            product.photo.data
        )
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in getting product photo",
        error: error.message,
      });
    }
  };
  export const deleteProductController = async (req, res) => {
    try {
      await productModel.findByIdAndDelete(req.params.pid).select("-photo")
      res.status(200).send({
        success:true,
        message:'product deleted successfully'
      })
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in deleting product photo",
        error: error.message,
      });
    }
  };


  export const updateProductController = async (req, res) => {
    try {
      const { name, description, slug, price, category, quantity, shipping } =
        req.fields;
      const { photo } = req.files;
  
      switch (true) {
        case !name:
          return res.status(500).send({ error: "name is required" });
        case !description:
          return res.status(500).send({ error: "description is required" });
        case !price:
          return res.status(500).send({ error: "price is required" });
        case !category:
          return res.status(500).send({ error: "category is required" });
        case !quantity:
          return res.status(500).send({ error: "quantity is required" });
        case !photo && photo.size > 10000:
          return res
            .status(500)
            .send({ error: "photo is required and should be less than 1 mb" });
      }
  
      const products = await productModel.findByIdAndUpdate(req.params.pid,
      {...req.fields,slug:slugify(name)},{new:true})
      if (photo) {
        products.photo.data = fs.readFileSync(photo.path);
        products.photo.contentType = photo.type;
      }
      await products.save();
      res.status(201).send({
        success: true,
        message: "Product updated Succesfully",
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "product updation failed",
        error,
      });
    }
  };