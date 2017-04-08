#!/bin/bash
# 复制打包后的文件到目标生产本地地址
cp -R "dest" "build"
cd "build"
git pull
git checkout master
git add .
git commit -m "前端代码重新打包"
git push origin HEAD:refs/for/master