# 大文件上传

## 文件切片

## 文件标识

## 上传切片的数据结构

```

切片(chunk)对象：
    + chunk: 文件对应的切片
    + size：切片大小
    + fileHash: 总文件hash
    + index: 切片下标
    + chunkHash；切片的hash (采用"总文件hash" + "切片下标") 来表示

```

