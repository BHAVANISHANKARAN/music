import { Music } from "../models/music.model.js";
import { Op, Sequelize } from "sequelize";
import { sequelize } from "../config.js";

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

async function searchMusicQuery(searchTerm) {
  return await Music.findAll({
    where: {
      [Op.or]: [
        { artist: { [Op.like]: `%${searchTerm}%` } },
        { title: { [Op.like]: `%${searchTerm}%` } },
        { releaseDate: { [Op.like]: `%${searchTerm}%` } },
        { genre: { [Op.like]: `%${searchTerm}%` } },
      ],
    },
  });
}

async function getAlbumByGroupByQuery(ans) {
  return await Music.findAll({
    attributes: [
      ans.groupby,
      [
        sequelize.fn(`${ans.func}`, sequelize.col(`${ans.column}`)),
        `${ans.func}_${ans.column}`,
      ],
    ],
    group: [ans.groupby],
  });
}

export default {
  getAllMusicQuery,
  createMusicQuery,
  getMusicByIDQuery,
  deleteMusicByIDQuery,
  updateMusicByIDQuery,
  searchMusicQuery,
  getAlbumByGroupByQuery,
};
