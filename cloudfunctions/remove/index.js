const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database();
const _ = db.command;

exports.main = async (event, context) => {
  var mess = {};
  try {
    await db.collection('list').where({
      openid: event.userInfo.openId
    }).update({
      data: {
        list: _.pull({
          cover: event.img
        })
      }
    });
    await cloud.deleteFile({
      fileList: [event.img]
    })
    mess.code = 0;
  }
  catch (e) {
    console.log(e);
    mess.code = -1;
    mess.err = e;
  }
  return mess;
}