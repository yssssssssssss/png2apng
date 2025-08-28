# Git 终端推送流程指南

## 📋 目录
- [基础环境准备](#基础环境准备)
- [项目初始化流程](#项目初始化流程)
- [日常开发推送流程](#日常开发推送流程)
- [分支管理流程](#分支管理流程)
- [常见问题解决](#常见问题解决)
- [高级操作](#高级操作)

---

## 🚀 基础环境准备

### 1. Git 安装与配置
```bash
# 检查 Git 版本
git --version

# 配置用户信息（首次使用必须）
git config --global user.name "你的用户名"
git config --global user.email "你的邮箱@example.com"

# 查看配置信息
git config --list
```

### 2. SSH 密钥配置（推荐）
```bash
# 生成 SSH 密钥
ssh-keygen -t rsa -b 4096 -C "你的邮箱@example.com"

# 查看公钥内容
cat ~/.ssh/id_rsa.pub

# 测试 GitHub 连接
ssh -T git@github.com
```

---

## 🏗️ 项目初始化流程

### 方案一：本地项目推送到新仓库

#### 步骤 1：初始化本地仓库
```bash
# 进入项目目录
cd /path/to/your/project

# 初始化 Git 仓库
git init

# 查看仓库状态
git status
```

#### 步骤 2：配置 .gitignore
```bash
# 创建 .gitignore 文件
touch .gitignore

# 编辑 .gitignore（添加需要忽略的文件）
echo "node_modules/" >> .gitignore
echo "dist/" >> .gitignore
echo ".env" >> .gitignore
echo "*.log" >> .gitignore
```

#### 步骤 3：添加文件到暂存区
```bash
# 添加所有文件
git add .

# 或者添加特定文件
git add 文件名

# 查看暂存区状态
git status
```

#### 步骤 4：提交更改
```bash
# 首次提交
git commit -m "Initial commit: 项目描述"

# 查看提交历史
git log --oneline
```

#### 步骤 5：连接远程仓库
```bash
# 添加远程仓库（GitHub/GitLab/Gitee）
git remote add origin https://github.com/用户名/仓库名.git

# 或使用 SSH（推荐）
git remote add origin git@github.com:用户名/仓库名.git

# 查看远程仓库
git remote -v
```

#### 步骤 6：推送到远程仓库
```bash
# 首次推送（设置上游分支）
git push -u origin main

# 或者如果默认分支是 master
git push -u origin master
```

### 方案二：克隆现有仓库
```bash
# 克隆仓库
git clone https://github.com/用户名/仓库名.git

# 进入项目目录
cd 仓库名

# 查看远程仓库信息
git remote -v
```

---

## 🔄 日常开发推送流程

### 标准工作流程

#### 1. 更新本地代码
```bash
# 拉取最新代码
git pull origin main

# 或者分步操作
git fetch origin
git merge origin/main
```

#### 2. 查看文件状态
```bash
# 查看工作区状态
git status

# 查看具体修改内容
git diff

# 查看暂存区与最新提交的差异
git diff --cached
```

#### 3. 添加修改到暂存区
```bash
# 添加所有修改
git add .

# 添加特定文件
git add 文件路径

# 交互式添加（选择性添加）
git add -p

# 添加所有已跟踪文件的修改
git add -u
```

#### 4. 提交更改
```bash
# 提交暂存区内容
git commit -m "feat: 添加新功能描述"

# 提交并添加详细描述
git commit -m "feat: 添加用户登录功能" -m "- 实现用户名密码验证\n- 添加记住登录状态\n- 优化登录界面UI"

# 修改上一次提交（未推送的情况下）
git commit --amend -m "修正后的提交信息"
```

#### 5. 推送到远程仓库
```bash
# 推送到默认分支
git push

# 推送到指定分支
git push origin 分支名

# 强制推送（谨慎使用）
git push --force
```

### 提交信息规范
```bash
# 功能添加
git commit -m "feat: 添加用户注册功能"

# 问题修复
git commit -m "fix: 修复登录页面样式问题"

# 文档更新
git commit -m "docs: 更新 README 文档"

# 样式修改
git commit -m "style: 调整按钮颜色和间距"

# 代码重构
git commit -m "refactor: 重构用户管理模块"

# 性能优化
git commit -m "perf: 优化图片加载性能"

# 测试相关
git commit -m "test: 添加用户登录单元测试"
```

---

## 🌿 分支管理流程

### 创建和切换分支
```bash
# 查看所有分支
git branch -a

# 创建新分支
git branch 新分支名

# 切换到分支
git checkout 分支名

# 创建并切换到新分支
git checkout -b 新分支名

# 或使用新语法
git switch -c 新分支名
```

### 分支推送流程
```bash
# 推送新分支到远程
git push -u origin 分支名

# 推送当前分支
git push

# 删除远程分支
git push origin --delete 分支名
```

### 分支合并流程
```bash
# 切换到主分支
git checkout main

# 拉取最新代码
git pull origin main

# 合并功能分支
git merge 功能分支名

# 推送合并结果
git push origin main

# 删除已合并的本地分支
git branch -d 功能分支名
```

---

## ⚠️ 常见问题解决

### 1. 推送被拒绝
```bash
# 问题：remote rejected
# 解决：先拉取远程更改
git pull origin main
# 解决冲突后再推送
git push origin main
```

### 2. 合并冲突
```bash
# 查看冲突文件
git status

# 手动编辑冲突文件，然后
git add 冲突文件
git commit -m "resolve: 解决合并冲突"
```

### 3. 撤销操作
```bash
# 撤销工作区修改
git checkout -- 文件名

# 撤销暂存区文件
git reset HEAD 文件名

# 撤销最后一次提交（保留修改）
git reset --soft HEAD~1

# 撤销最后一次提交（丢弃修改）
git reset --hard HEAD~1
```

### 4. 查看历史和状态
```bash
# 查看提交历史
git log --oneline --graph

# 查看文件修改历史
git log -p 文件名

# 查看某次提交的详细信息
git show 提交哈希

# 查看工作区状态
git status -s
```

---

## 🔧 高级操作

### 1. 储藏（Stash）操作
```bash
# 储藏当前修改
git stash

# 储藏并添加描述
git stash save "临时修改：优化性能"

# 查看储藏列表
git stash list

# 应用最新储藏
git stash pop

# 应用指定储藏
git stash apply stash@{0}

# 删除储藏
git stash drop stash@{0}
```

### 2. 标签管理
```bash
# 创建标签
git tag v1.0.0

# 创建带注释的标签
git tag -a v1.0.0 -m "版本 1.0.0 发布"

# 推送标签
git push origin v1.0.0

# 推送所有标签
git push origin --tags

# 删除标签
git tag -d v1.0.0
git push origin --delete v1.0.0
```

### 3. 远程仓库管理
```bash
# 查看远程仓库详细信息
git remote show origin

# 修改远程仓库 URL
git remote set-url origin 新的URL

# 添加多个远程仓库
git remote add upstream https://github.com/原作者/仓库名.git

# 从上游仓库拉取更新
git fetch upstream
git merge upstream/main
```

---

## 📝 快速参考命令

### 常用命令速查
```bash
# 基础操作
git init                    # 初始化仓库
git clone <url>            # 克隆仓库
git status                 # 查看状态
git add .                  # 添加所有文件
git commit -m "message"    # 提交更改
git push                   # 推送到远程
git pull                   # 拉取远程更改

# 分支操作
git branch                 # 查看分支
git checkout -b <branch>   # 创建并切换分支
git merge <branch>         # 合并分支
git branch -d <branch>     # 删除分支

# 历史查看
git log                    # 查看提交历史
git diff                   # 查看修改差异
git show <commit>          # 查看提交详情
```

---

## 🎯 最佳实践建议

1. **频繁提交**：小步快跑，每个功能点都及时提交
2. **清晰的提交信息**：使用规范的提交信息格式
3. **分支策略**：使用功能分支进行开发，主分支保持稳定
4. **代码审查**：通过 Pull Request 进行代码审查
5. **定期同步**：经常从远程仓库拉取最新代码
6. **备份重要分支**：重要功能分支及时推送到远程

---

*本指南涵盖了 Git 终端操作的主要流程，建议根据实际项目需求进行调整和补充。*