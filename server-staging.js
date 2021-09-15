const express = require("express");
const fs = require("fs");
const app = express();
var url = require("url");

var request = require("request");
const HOST_FE_DEV = 'https://staging.cortishare.com';
const HOST_API = 'https://stg-api.cortishare.com/api/app'
// require("dotenv").config();

app.use(express.static("build"));

// Get info Post
app.get("/board/:mapID/post/:postID", async (req, res) => {
  await request(
    `${HOST_API}/node/GetPostById?mapId=${req.params.mapID}&postId=${req.params.postID}`,
    async (error, response, body) => {
      if (!error && response.statusCode == 200) {
        let object = body && JSON.parse(body);
        let data = {
          url: `${HOST_FE_DEV}/board/${req.params.mapID}/post/${req.params.postID}`,
          title:
            object &&
            object.result &&
            object.result.post &&
            object.result.post.title,
          // description:
          //   object &&
          //   object.result &&
          //   object.result.post &&
          //   object.result.post.description,
          image:
            object &&
            object.result &&
            object.result.post &&
            object.result.post.postMedias && 
            object.result.post.postMedias[0] &&
            object.result.post.postMedias[0].pathUrl,
        };
        let html = fs.readFileSync("./index.html", "utf8");
        html = html.toString();
        html = html.replace("<title>CortiShare: Build, Store and Share Knowledge</title>", await renderMeta(data));
        res.send(html);
        res.end();
      } else {
        renderHtmlWithoutSSR(req, res);
      }
    }
  );
});
// Get info Map
app.get("/board/:mapID", async (req, res) => {
  await request(
    `${HOST_API}/map/GetPostsByMapId?mapId=${req.params.mapID}`,
    async (error, response, body) => {
      if (!error && response.statusCode == 200) {
        let object = body && JSON.parse(body);
        let data = {
          url: `${HOST_FE_DEV}/board/${req.params.mapID}`,
          title: object && object.result && object.result.title,
          description: object && object.result && object.result.description,
          image: object && object.result && object.result.thumbnail,
          createBy: object && object.result && object.result.createdBy,
        };

        let html = fs.readFileSync("./index.html", "utf8");
        html = html.toString();
        html = html.replace("<title>CortiShare: Build, Store and Share Knowledge</title>", await renderMeta(data));
        res.send(html);
        res.end();
      } else {
        renderHtmlWithoutSSR(req, res);
      }
    }
  );
});

// Get info Node
app.get("/board/:mapID/node/:nodeID", async (req, res) => {
  await request(
    `${HOST_API}/node/GetPostsByNodeId?NodeId=${req.params.nodeID}&MapId=${req.params.mapID}`,
    async (error, response, body) => {
      if (!error && response.statusCode == 200) {
        let object = body && JSON.parse(body);
        let data = {
          url: `${HOST_FE_DEV}/board/${req.params.mapID}/node/${req.params.nodeID}`,
          title: object && object.result && object.result.title,
          image: "",
          createBy: object && object.result && object.result.createdBy,
        };

        let html = fs.readFileSync("./index.html", "utf8");
        html = html.toString();
        html = html.replace("<title>CortiShare: Build, Store and Share Knowledge</title>", await renderMeta(data));
        res.send(html);
        res.end();
      } else {
        renderHtmlWithoutSSR(req, res);
      }
    }
  );
});

const renderHtmlWithoutSSR = async (req, res) => {
  var fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  const object = {
    url: fullUrl,
  };
  let html = fs.readFileSync("./index.html", "utf8");
  html = html.toString();
  html = html.replace("<title>CortiShare: Build, Store and Share Knowledge</title>", await renderMeta(object));
  res.send(html);
  res.end();
};

app.get("*", async (req, res) => {
  renderHtmlWithoutSSR(req, res);
});

app.listen(4000, () => {
  console.log(`Server is listening http://localhost:${4000}/`);
});

function renderMeta(object) {
  if (!object) return;
  let {url, title, description, createBy, image} = object;
  return `
    <title>${title || "CortiShare: Build, Store and Share Knowledge"}</title>
    <meta charset="utf-8" >
    <meta name="csrf_token" content="" >
    <meta property="type" content="website" >
    <meta property="url" content='${url}' >
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" >
    <meta name="msapplication-TileColor" content="#ffffff" >
    <meta name="theme-color" content="#ffffff" >
    <meta name="_token" content="" >
    <meta name="robots" content="noodp" >
    <meta property="title" content="${title || ""}" >
    <meta property="quote" content="" >
    <meta name="description" content="${description || ""}" >
    <meta property="image" content="${image || "/logoCortishare.png"}" >
    <meta property="og:locale" content="en_US" >
    <meta property="og:type" content="website" >
    <meta property="og:title" content="${title || "CortiShare: Build, Store and Share Knowledge"}" >
    <meta property="og:quote" content="" >
    <meta property="og:hashtag" content="#cortiShare" >
    <meta property="og:image" content='${image || "/logoCortishare.png"}' >
    <meta property="og:url" content='${url}' >
    <meta content="image/*" property="og:image:type" >
    <meta property="og:site_name" content="CortiShare: Build, Store and Share Knowledge" >
    <meta property="og:description" content="${description || ""}" >

    <!-- Twitter Card data -->
    <meta name="twitter:card" content="summary">
    <meta name="twitter:site" content="@CortiShare: Build, Store and Share Knowledge">
    <meta name="twitter:title" content="${title || "CortiShare: Build, Store and Share Knowledge"}">
    <meta name="twitter:description" content="${description || ""}">
    <meta name="twitter:creator" content="${createBy || ""}">
    <meta name="twitter:image" content='${image || "/logoCortishare.png"}'>
  `;
}
