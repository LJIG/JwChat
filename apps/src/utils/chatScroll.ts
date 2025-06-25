/*
 * @Author: Bian <389701057@qq.com>
 * @Date: 2022-05-30 23:08:21
 * @LastEditTime: 2022-10-12 21:38:48
 * @LastEditors: Bian <389701057@qq.com>
 * @Description:
 * @FilePath: \src\utils\chatScroll.ts
 * hello
 */
import BScroll from "@better-scroll/core";
import { extend } from "@better-scroll/shared-utils";

export type MyPluginOptions = Partial<MyPluginConfig> | true;

type MyPluginConfig = {
  // scrollText: string;
  // scrollEndText: string;
};

interface PluginAPI {
  printScrollText(): void;
}

declare module "@better-scroll/core" {
  interface CustomOptions {
    myPlugin?: MyPluginOptions;
  }

  interface CustomAPI {
    myPlugin: PluginAPI;
  }
}

export default class MyPlugin implements PluginAPI {
  static pluginName = "myPlugin";
  public options!: MyPluginConfig;
  public domPotision: Array<any> = [];
  private beforeNode: any;

  constructor(public scroll: BScroll) {
    this.handleOptions();

    this.handleBScroll();

    this.registerHooks();
  }

  private handleOptions() {
    const userOptions = (
      this.scroll.options.myPlugin === true ? {} : this.scroll.options.myPlugin
    ) as Partial<MyPluginConfig>;
    const defaultOptions: MyPluginConfig = {
      // scrollText: "I am scrolling",
      // scrollEndText: "Scroll has ended",
    };
    this.options = extend(defaultOptions, userOptions);
  }

  private handleBScroll() {
    const propertiesConfig = [
      {
        key: "printScrollText",
        sourceKey: "plugins.myPlugin.printScrollText",
      },
      {
        key: "saveNodes",
        sourceKey: "plugins.myPlugin.saveNodes",
      },
      {
        key: "unread",
        sourceKey: "plugins.myPlugin.unread",
      },
      {
        key: "isBottom",
        sourceKey: "plugins.myPlugin.isBottom",
      },
      {
        key: "scrollBottom",
        sourceKey: "plugins.myPlugin.scrollBottom",
      },
      {
        key: "savePosition",
        sourceKey: "plugins.myPlugin.savePosition",
      },
    ];
    // 将 myPlugin.printScrollText 代理至 bs.printScrollText
    this.scroll.proxy(propertiesConfig);
    // 注册 printScrollEndText 事件至 bs，以至于用户可以通过 bs.on('printScrollEndText', handler) 来订阅事件
    this.scroll.registerType(["printScrollEndText"]);
  }

  get unread() {
    let result = 0;
    this.domPotision.forEach((i) => {
      const { read } = i;
      if (!read) {
        result += 1;
      }
    });
    return result;
  }

  get isBottom() {
    let result = false;
    const { y, maxScrollY } = this.scroll;
    result = Math.abs(y) >= Math.abs(maxScrollY);
    return result;
  }

  printScrollText() {
    console.log(
      this.scroll,
      this.options,
      this.unread,
      this.scroll.eventTypes.scrollEnd
    );
    return 12;
  }

  /**
   * @description: 更新并保存数据
   * @param { nodes, dataList } params //传入要保存的节点和要保存的数据
   * @return {*}
   */
  saveNodes(params = { nodes: [], dataList: [] }) {
    // debugger
    const { nodes = [], dataList } = params;
    let result: any = [];
    const previous = this.domPotision;
    for (const key in nodes) {
      if (Object.hasOwnProperty.call(nodes, key)) {
        const node: any = nodes[key];
        const dataStr = JSON.stringify(dataList[key]);
        const top = node.offsetTop;
        let item = {
          top,
          node,
          read: false,
          data: dataStr,
        };
        // 是否是存在的数据
        const resultKey = previous.findIndex((i) => i.data === dataStr);
        if (typeof resultKey === "number" && resultKey > -1) {
          let { read = false } = previous[resultKey] || {};
          item.read = read;
        }
        result.push(item);
      }
    }
    this.domPotision = result;
    this.readState();
  }

  /**
   * @description: 设置是否已读
   * @param {*}
   * @return {*}
   */
  readState() {
    const { y, content } = this.scroll;
    let currentTop = Math.abs(y);
    const viewSize = content.parentElement?.clientHeight || 0;
    const previous = this.domPotision;

    let resultKey = -1;
    if (this.beforeNode) {
      // 查询之前保存的节点
      resultKey = previous.findIndex(
        (i: any) => i.data === this.beforeNode.data
      );
    }
    previous.forEach((i: any, j: number) => {
      const { top, node } = i;
      const itemDomSize = node.clientHeight;
      // 判断元素是否在视窗中
      // 元素显示 超过.9 定为已读
      if (currentTop + viewSize > top + itemDomSize * 0.9 || resultKey > j) {
        i.read = true;
      }
    });

    this.domPotision = previous;
  }

  /**
   * @description: 判断当前的滚动位置是处于哪个元素内
   * @param {*}
   * @return {*}
   */
  scrollPositionDom() {
    const { y } = this.scroll;
    if (y >= 0) return 0; //大于0表示在上拉
    let currentTop = Math.abs(y);
    const doms = this.domPotision;
    let result = -1;

    doms.forEach((i, j) => {
      const { top } = i;
      if (result === -1) result = j;
      if (currentTop >= top) {
        result = j + 1;
      }
    });

    return result;
  }

  savePosition() {
    const nodeIndex = this.scrollPositionDom();
    this.beforeNode = this.domPotision[nodeIndex];
    // console.log("保存当前节点", this.beforeNode);
  }

  scrollBottom() {
    this.scroll.scrollTo(0, this.scroll.maxScrollY, 200);
  }

  private registerHooks() {
    const scroll = this.scroll;
    scroll.on(
      scroll.eventTypes.scrollEnd,
      ({ x, y }: { x: number; y: number }) => {
        // console.log("滚动完成");

        this.readState();
        this.savePosition(); // 保存当前滚动位置
      }
    );
  }
}
