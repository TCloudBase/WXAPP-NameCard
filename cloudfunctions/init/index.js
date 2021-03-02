const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database();

exports.main = async (event, context) => {
  var mess = {};
  try {
    const userdata = (await db.collection('list').where({
      openid: event.userInfo.openId
    }).get()).data;
    if (userdata.length != 0) {
      mess.list = userdata[0].list;
      mess.id = userdata[0]._id;
      mess.code = 0;
    }
    else {
      let result = await db.collection('list').add({
        data: {
          openid: event.userInfo.openId,
          list: []
        }
      });
      mess.id = result._id;
      mess.list = [];
      mess.code = 0;
    }
  }
  catch (e) {
    console.log(e);
    mess.code = -1;
    mess.err = e;
  }
  return mess;
}