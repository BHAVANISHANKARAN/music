import { Music } from "../models/music.model.js";
import musicService from "../services/music.service.js";

async function getAllMusic(request, response) {
  var urlQuery = request.query;
  console.log(urlQuery);

  const page = urlQuery?.page || 1;
  const limit = urlQuery?.limit || 5;
  let dbQuery = {};

  if (urlQuery.orderBy && urlQuery.order) {
    dbQuery.order = [[urlQuery.orderBy, urlQuery.order]];
  }
  if ("page" in urlQuery || "limit" in urlQuery) {
    dbQuery.offset = (page - 1) * limit;
    dbQuery.limit = limit;
  }
  var result = await musicService.getAllMusicQuery(dbQuery);
  response.send(result);
}

async function createMusic(request, response) {
  // console.log(request.body);
  var ans = request.body;

  var createAlbum = await musicService.createMusicQuery(ans);

  // response.send(insertedValue);
  response.send(createAlbum);
}

async function getMusicByID(request, response) {
  //   console.log(request.params.id);
  const { id } = request.params;
  var getAlbumByID = await musicService.getMusicByIDQuery(id);
  response.send(getAlbumByID);
}

async function deleteMusicByID(request, response) {
  //   console.log(request.params.id);
  const { id } = request.params;
  const msg = { msg: "not found" };
  var deleteAlbumByID = await musicService.deleteMusicByIDQuery(id);
  deleteAlbumByID
    ? response.send({ msg: "deleted successfully" }, deleteAlbumByID)
    : response.status(404).send(msg);
}

async function updateMusicByID(request, response) {
  // console.log(request.body);
  const { id } = request.params;
  const ans = request.body;
  const msg = { msg: "not found" };
  var updateAlbumByID = await musicService.updateMusicByIDQuery(ans, id);
  updateAlbumByID
    ? response.send(updateAlbumByID)
    : response.status(404).send(msg);
}

async function searchMusic(request, response) {
  const searchTerm = request.query.search;
  console.log(searchTerm);
  var arrayOfObjects = await musicService.searchMusicQuery(searchTerm);
  response.send(arrayOfObjects);
}

async function getAlbumByGroupBy(request, response) {
  var ans = request.query;
  console.log(ans);

  var getAllAlbum = await musicService.getAlbumByGroupByQuery(ans);
  response.send(getAllAlbum);
}

export default {
  getAllMusic,
  createMusic,
  getMusicByID,
  deleteMusicByID,
  updateMusicByID,
  searchMusic,
  getAlbumByGroupBy,
};
