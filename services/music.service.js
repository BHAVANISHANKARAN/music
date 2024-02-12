import { Music } from "../models/music.model.js";

async function getAllMusicQuery(dbQuery) {
  return await Music.findAll(dbQuery);
}

async function createMusicQuery(ans) {
  return await Music.create(ans);
}

async function getMusicByIDQuery(id) {
  return await Music.findOne({
    where: {
      id: id,
    },
  });
}

async function deleteMusicByIDQuery(id) {
  return await Music.destroy({
    where: {
      id: id,
    },
  });
}

async function updateMusicByIDQuery(ans, id) {
  return await Music.update(ans, {
    where: {
      id: id,
    },
  });
}

export default {
  getAllMusicQuery,
  createMusicQuery,
  getMusicByIDQuery,
  deleteMusicByIDQuery,
  updateMusicByIDQuery,
};
