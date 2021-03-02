const tencentcloud = require("tencentcloud-sdk-nodejs");
const key = require('key.json')
const OcrClient = tencentcloud.ocr.v20181119.Client;
const clientConfig = {
  credential: key,
  region: "ap-shanghai",
  profile: {
    httpProfile: {
      endpoint: "ocr.tencentcloudapi.com",
    },
  }
};
exports.main = async (event) => {
  let res = {}
  const client = new OcrClient(clientConfig);
  const result = await client.BusinessCardOCR({
    ImageUrl: event.url
  })
  if(result.Error==null){
    res.code = 0;
    res.data = result.BusinessCardInfos
  }
  else{
    res.code = -1;
    res.msg = result.Error.Code
  }
  return res
}