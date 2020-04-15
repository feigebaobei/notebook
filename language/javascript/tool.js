const loadImg = function (url, alt) {
  return new Promise((resolve, reject) => {
    let image = new Image()
    image.src = url
    image.alt = alt
    image.onload = () => {
      // resolve(image)
      resolve({
        data: image,
        status: true // 是否成功
      })
    }
    image.onerror = () => {
      // reject(new Error('图片加载失败'))
      reject({
        data: image,
        status: false
      })
    }
  })
}

export { loadImg }