# JwChat

Vue聊天组件集合的monorepo项目。 

## 项目结构

```
JwChat/
├── packages/         # 子包集合
│   ├── ChatIndex/    # 聊天索引组件
│   ├── ChatSimple/   # 简单聊天组件
│   ├── JwChatIcon/   # 图标组件
│   ├── JwChatItem/   # 聊天项组件
│   ├── QuickTalk/    # 快速对话组件
│   ├── RightList/    # 右侧列表组件
│   └── Empty/        # 空状态组件
├── src/              # 主包源码
├── public/           # 静态资源
├── script/           # 构建脚本
├── package.json      # 主包配置
├── pnpm-workspace.yaml # workspace配置
└── turbo.json        # 构建优化配置
```

## 开发命令

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建主包
pnpm build

# 构建库文件
pnpm lib

# 构建所有包
pnpm build:all

# 清理依赖
pnpm clean

# 生成新组件
pnpm gen
```

## 包管理

- 主包：`jwchat` - 发布到npm的主要包
- 子包：`@jwchat/*` - 内部使用的组件包

## 技术栈

- Vue 3
- TypeScript
- Vite
- pnpm workspace
- Turbo (可选) 