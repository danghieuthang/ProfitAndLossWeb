"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generator = exports.generatorDynamicRouter = void 0;

var loginService = _interopRequireWildcard(require("@/api/login"));

var _layouts = require("@/layouts");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var constantRouterComponents = {
  BasicLayout: _layouts.BasicLayout,
  BlankLayout: _layouts.BlankLayout,
  RouteView: _layouts.RouteView,
  PageView: _layouts.PageView,
  'SplitTransaction': function SplitTransaction() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/transaction/SplitTransaction'));
    });
  },
  '403': function _() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/exception/403'));
    });
  },
  '404': function _() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/exception/404'));
    });
  },
  '500': function _() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/exception/500'));
    });
  },
  // 你需要动态引入的页面组件
  'Workplace': function Workplace() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/dashboard/Workplace'));
    });
  },
  'Analysis': function Analysis() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/dashboard/Analysis'));
    });
  },
  // form
  'BasicForm': function BasicForm() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/form/basicForm'));
    });
  },
  'StepForm': function StepForm() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/form/stepForm/StepForm'));
    });
  },
  'AdvanceForm': function AdvanceForm() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/form/advancedForm/AdvancedForm'));
    });
  },
  // list
  'TableList': function TableList() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/list/TableList'));
    });
  },
  'StandardList': function StandardList() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/list/BasicList'));
    });
  },
  'CardList': function CardList() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/list/CardList'));
    });
  },
  'SearchLayout': function SearchLayout() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/list/search/SearchLayout'));
    });
  },
  'SearchArticles': function SearchArticles() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/list/search/Article'));
    });
  },
  'SearchProjects': function SearchProjects() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/list/search/Projects'));
    });
  },
  'SearchApplications': function SearchApplications() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/list/search/Applications'));
    });
  },
  'ProfileBasic': function ProfileBasic() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/profile/basic'));
    });
  },
  'ProfileAdvanced': function ProfileAdvanced() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/profile/advanced/Advanced'));
    });
  },
  // result
  'ResultSuccess': function ResultSuccess() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/result/Success'));
    });
  },
  'ResultFail': function ResultFail() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/result/Error'));
    });
  },
  // exception
  'Exception403': function Exception403() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/exception/403'));
    });
  },
  'Exception404': function Exception404() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/exception/404'));
    });
  },
  'Exception500': function Exception500() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/exception/500'));
    });
  },
  // account
  'AccountCenter': function AccountCenter() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/account/center'));
    });
  },
  'AccountSettings': function AccountSettings() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/account/settings/Index'));
    });
  },
  'BaseSettings': function BaseSettings() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/account/settings/BaseSetting'));
    });
  },
  'SecuritySettings': function SecuritySettings() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/account/settings/Security'));
    });
  },
  'CustomSettings': function CustomSettings() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/account/settings/Custom'));
    });
  },
  'BindingSettings': function BindingSettings() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/account/settings/Binding'));
    });
  },
  'NotificationSettings': function NotificationSettings() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/account/settings/Notification'));
    });
  } // 'TestWork': () => import(/* webpackChunkName: "TestWork" */ '@/views/dashboard/TestWork')

}; // 前端未找到页面路由（固定不用改）

var notFoundRouter = {
  path: '*',
  redirect: '/404',
  hidden: true
}; // 根级菜单

var rootRouter = {
  key: '',
  name: 'index',
  path: '',
  component: 'BasicLayout',
  redirect: '/dashboard',
  meta: {
    title: '首页'
  },
  children: []
};
/**
 * 动态生成菜单
 * @param token
 * @returns {Promise<Router>}
 */

var generatorDynamicRouter = function generatorDynamicRouter(token) {
  return new Promise(function (resolve, reject) {
    loginService.getCurrentUserNav(token).then(function (res) {
      console.log('res', res);
      var result = res.result;
      var menuNav = [];
      var childrenNav = []; //      后端数据, 根级树数组,  根级 PID

      listToTree(result, childrenNav, 0);
      rootRouter.children = childrenNav;
      menuNav.push(rootRouter);
      console.log('menuNav', menuNav);
      var routers = generator(menuNav);
      routers.push(notFoundRouter);
      console.log('routers', routers);
      resolve(routers);
    })["catch"](function (err) {
      reject(err);
    });
  });
};
/**
 * 格式化树形结构数据 生成 vue-router 层级路由表
 *
 * @param routerMap
 * @param parent
 * @returns {*}
 */


exports.generatorDynamicRouter = generatorDynamicRouter;

var generator = function generator(routerMap, parent) {
  return routerMap.map(function (item) {
    var _ref = item.meta || {},
        title = _ref.title,
        show = _ref.show,
        hideChildren = _ref.hideChildren,
        hiddenHeaderContent = _ref.hiddenHeaderContent,
        target = _ref.target,
        icon = _ref.icon;

    var currentRouter = {
      // 如果路由设置了 path，则作为默认 path，否则 路由地址 动态拼接生成如 /dashboard/workplace
      path: item.path || "".concat(parent && parent.path || '', "/").concat(item.key),
      // 路由名称，建议唯一
      name: item.name || item.key || '',
      // 该路由对应页面的 组件 :方案1
      // component: constantRouterComponents[item.component || item.key],
      // 该路由对应页面的 组件 :方案2 (动态加载)
      component: constantRouterComponents[item.component || item.key] || function () {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("@/views/".concat(item.component)));
        });
      },
      // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
      meta: {
        title: title,
        icon: icon || undefined,
        hiddenHeaderContent: hiddenHeaderContent,
        target: target,
        permission: item.name
      }
    }; // 是否设置了隐藏菜单

    if (show === false) {
      currentRouter.hidden = true;
    } // 是否设置了隐藏子菜单


    if (hideChildren) {
      currentRouter.hideChildrenInMenu = true;
    } // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠


    if (!currentRouter.path.startsWith('http')) {
      currentRouter.path = currentRouter.path.replace('//', '/');
    } // 重定向


    item.redirect && (currentRouter.redirect = item.redirect); // 是否有子菜单，并递归处理

    if (item.children && item.children.length > 0) {
      // Recursion
      currentRouter.children = generator(item.children, currentRouter);
    }

    return currentRouter;
  });
};
/**
 * 数组转树形结构
 * @param list 源数组
 * @param tree 树
 * @param parentId 父ID
 */


exports.generator = generator;

var listToTree = function listToTree(list, tree, parentId) {
  list.forEach(function (item) {
    // 判断是否为父级菜单
    if (item.parentId === parentId) {
      var child = _objectSpread({}, item, {
        key: item.key || item.name,
        children: []
      }); // 迭代 list， 找到当前菜单相符合的所有子菜单


      listToTree(list, child.children, item.id); // 删掉不存在 children 值的属性

      if (child.children.length <= 0) {
        delete child.children;
      } // 加入到树中


      tree.push(child);
    }
  });
};