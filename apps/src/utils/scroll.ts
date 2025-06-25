"use strict";
import BScroll from "@better-scroll/core";
import MouseWheel from "@better-scroll/mouse-wheel";
import ScrollBar from "@better-scroll/scroll-bar";
import ObserveDOM from "@better-scroll/observe-dom";
import ObserveImage from "@better-scroll/observe-image";
import PullDown from "@better-scroll/pull-down";
import ChatScroll from './chatScroll'

BScroll.use(ChatScroll)
BScroll.use(MouseWheel); // 鼠标
BScroll.use(ScrollBar); // 滚动条
BScroll.use(ObserveDOM); // 自动reset
BScroll.use(ObserveImage); // 图片加载
BScroll.use(PullDown); // 下拉加载

export default BScroll;
