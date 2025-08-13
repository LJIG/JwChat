import ComponentList from "jwchatMd/list.json";
import { reactive, defineComponent } from "vue";
import "./App.scss";

const App = defineComponent({
  setup() {
    const data = reactive({
      links: ComponentList.map((item) => ({
        path: `/components/${item.compName}`,
        name: item.compZhName,
      })),
    });

    return () => (
      <div class="jwchat-doc">
        <aside>
          {[{ path: "/", name: "开始" }, ...data.links].map((link, index) => (
            <router-link key={index} to={link.path}>
              {link.name}
            </router-link>
          ))}
        </aside>
        <main>
          {/* <transition> */}
          <router-view />
          {/* </transition> */}
        </main>
      </div>
    );
  },
});

export default App;
