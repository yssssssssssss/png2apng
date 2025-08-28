# Git 操作完整指南

## 📚 文档导航

本指南包含两个完整的 Git 操作流程文档，适用于不同的使用场景：

### 📖 文档列表
1. **[Git 终端推送流程指南](./Git终端推送流程指南.md)** - 基于命令行的完整 Git 操作
2. **[Trae 编辑器 Git 操作流程指南](./Trae编辑器Git操作流程指南.md)** - 基于 Trae IDE 图形界面的 Git 操作

---

## 🎯 使用场景对比

### 终端操作 vs Trae 编辑器操作

| 特性 | 终端操作 | Trae 编辑器操作 |
|------|----------|------------------|
| **学习曲线** | 较陡峭，需要记忆命令 | 平缓，图形界面直观 |
| **操作效率** | 熟练后非常高效 | 适中，点击操作较多 |
| **功能完整性** | 完整，支持所有 Git 功能 | 覆盖常用功能，部分高级功能需命令行 |
| **错误处理** | 需要理解错误信息 | 提供友好的错误提示 |
| **批量操作** | 支持脚本和批量处理 | 主要支持单个操作 |
| **可视化** | 文本输出 | 图形化差异对比、分支图 |
| **适用人群** | 开发者、运维人员 | 所有用户，特别是初学者 |

---

## 🚀 快速开始指南

### 新手推荐路径
1. **第一次使用 Git**：建议从 [Trae 编辑器指南](./Trae编辑器Git操作流程指南.md) 开始
2. **有一定经验**：可以直接使用 [终端操作指南](./Git终端推送流程指南.md)
3. **混合使用**：日常操作用 Trae，复杂操作用终端

### 常见操作快速索引

#### 🔧 项目初始化
- **终端**：[项目初始化流程](./Git终端推送流程指南.md#项目初始化流程)
- **Trae**：[初始化和克隆仓库](./Trae编辑器Git操作流程指南.md#初始化和克隆仓库)

#### 📝 日常提交
- **终端**：[日常开发推送流程](./Git终端推送流程指南.md#日常开发推送流程)
- **Trae**：[提交操作流程](./Trae编辑器Git操作流程指南.md#提交操作流程)

#### 🌿 分支管理
- **终端**：[分支管理流程](./Git终端推送流程指南.md#分支管理流程)
- **Trae**：[分支管理](./Trae编辑器Git操作流程指南.md#分支管理)

#### ⚔️ 冲突解决
- **终端**：[常见问题解决](./Git终端推送流程指南.md#常见问题解决)
- **Trae**：[冲突解决](./Trae编辑器Git操作流程指南.md#冲突解决)

---

## 📋 操作对照表

### 基础操作对照

| 操作 | 终端命令 | Trae 编辑器操作 |
|------|----------|------------------|
| **查看状态** | `git status` | 源代码管理面板自动显示 |
| **添加文件** | `git add .` | 点击文件旁的 `+` 按钮 |
| **提交更改** | `git commit -m "message"` | 输入提交信息 → 点击提交按钮 |
| **推送代码** | `git push` | 点击"同步更改"按钮 |
| **拉取代码** | `git pull` | 点击"同步更改"按钮 |
| **创建分支** | `git checkout -b branch-name` | 点击分支名 → "创建新分支" |
| **切换分支** | `git checkout branch-name` | 点击分支名 → 选择目标分支 |
| **查看差异** | `git diff` | 点击修改的文件查看差异 |
| **查看历史** | `git log` | 安装 Git History 扩展 |

### 高级操作对照

| 操作 | 终端命令 | Trae 编辑器操作 |
|------|----------|------------------|
| **储藏更改** | `git stash` | 更多操作 → 储藏 → 储藏更改 |
| **应用储藏** | `git stash pop` | 更多操作 → 储藏 → 弹出储藏 |
| **重置更改** | `git reset --hard HEAD` | 更多操作 → 撤销 → 撤销所有更改 |
| **修改提交** | `git commit --amend` | 更多操作 → 提交 → 修改上次提交 |
| **变基操作** | `git rebase` | 分支右键菜单 → 变基分支 |
| **合并分支** | `git merge` | 分支右键菜单 → 合并分支 |

---

## 🎓 学习建议

### 初学者路径
1. **第1周**：熟悉 Trae 编辑器的基础 Git 操作
   - 文件暂存和提交
   - 查看文件差异
   - 基础分支操作

2. **第2-3周**：学习终端基础命令
   - `git status`, `git add`, `git commit`
   - `git push`, `git pull`
   - `git branch`, `git checkout`

3. **第4周及以后**：掌握高级功能
   - 冲突解决
   - 分支合并和变基
   - 储藏和标签管理

### 进阶用户建议
- **日常开发**：使用 Trae 编辑器进行可视化操作
- **复杂操作**：切换到终端执行高级命令
- **脚本自动化**：编写 Git 脚本提高效率
- **团队协作**：建立统一的 Git 工作流程

---

## 🔧 工具配置建议

### Trae 编辑器扩展推荐
```json
{
  "推荐扩展": [
    "GitLens — Git supercharged",
    "Git History",
    "Git Graph",
    "GitHub Pull Requests and Issues",
    "GitKraken Glo Boards"
  ]
}
```

### 终端工具推荐
- **Windows**：Git Bash, PowerShell, Windows Terminal
- **macOS**：Terminal, iTerm2, Hyper
- **Linux**：Bash, Zsh, Fish Shell

### Git 配置优化
```bash
# 全局配置
git config --global core.editor "code --wait"
git config --global merge.tool "vscode"
git config --global diff.tool "vscode"
git config --global core.autocrlf true  # Windows
git config --global core.autocrlf input # macOS/Linux

# 别名配置
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.unstage 'reset HEAD --'
```

---

## 📊 最佳实践总结

### 通用最佳实践
1. **提交频率**：小步快跑，频繁提交
2. **提交信息**：使用清晰、规范的提交信息
3. **分支策略**：采用 Git Flow 或 GitHub Flow
4. **代码审查**：使用 Pull Request 进行代码审查
5. **备份策略**：重要分支及时推送到远程

### 团队协作建议
1. **统一工具**：团队成员使用相同的 Git 工具和配置
2. **工作流程**：建立明确的分支管理和合并策略
3. **代码规范**：制定统一的代码风格和提交规范
4. **培训计划**：定期进行 Git 使用培训
5. **文档维护**：保持 Git 操作文档的更新

---

## 🆘 故障排除快速参考

### 常见问题解决索引

| 问题类型 | 终端解决方案 | Trae 解决方案 |
|----------|--------------|---------------|
| **认证失败** | [认证问题](./Git终端推送流程指南.md#常见问题解决) | [认证问题](./Trae编辑器Git操作流程指南.md#故障排除) |
| **合并冲突** | [合并冲突](./Git终端推送流程指南.md#常见问题解决) | [冲突解决](./Trae编辑器Git操作流程指南.md#冲突解决) |
| **推送被拒** | [推送问题](./Git终端推送流程指南.md#常见问题解决) | [远程仓库操作](./Trae编辑器Git操作流程指南.md#远程仓库操作) |
| **分支同步** | [分支管理](./Git终端推送流程指南.md#分支管理流程) | [分支管理](./Trae编辑器Git操作流程指南.md#分支管理) |

---

## 📞 获取帮助

### 官方资源
- **Git 官方文档**：https://git-scm.com/doc
- **GitHub 帮助**：https://docs.github.com/
- **Trae 编辑器文档**：查看编辑器内置帮助

### 社区资源
- **Stack Overflow**：搜索 Git 相关问题
- **GitHub Community**：参与讨论和提问
- **Git 中文教程**：https://www.liaoxuefeng.com/wiki/896043488029600

---

*本完整指南涵盖了 Git 操作的两种主要方式，建议根据个人经验和项目需求选择合适的操作方式。两种方式可以互补使用，以达到最佳的开发效率。*