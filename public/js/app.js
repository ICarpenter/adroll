(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name) {
    var path = expand(name, '.');

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '"');
  };

  var define = function(bundle) {
    for (var key in bundle) {
      if (has(bundle, key)) {
        modules[key] = bundle[key];
      }
    }
  }

  globals.require = require;
  globals.require.define = define;
  globals.require.brunch = true;
})();

window.require.define({"application": function(exports, require, module) {
  var Application, Chaplin, HeaderController, Layout, mediator, routes,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  HeaderController = require('controllers/header-controller');

  Layout = require('views/layout');

  mediator = require('mediator');

  routes = require('routes');

  module.exports = Application = (function(_super) {

    __extends(Application, _super);

    function Application() {
      return Application.__super__.constructor.apply(this, arguments);
    }

    Application.prototype.title = 'Brunch example application';

    Application.prototype.initialize = function() {
      Application.__super__.initialize.apply(this, arguments);
      this.initDispatcher({
        controllerSuffix: '-controller'
      });
      this.initLayout();
      this.initMediator();
      this.initControllers();
      this.initRouter(routes);
      return typeof Object.freeze === "function" ? Object.freeze(this) : void 0;
    };

    Application.prototype.initLayout = function() {
      return this.layout = new Layout({
        title: this.title
      });
    };

    Application.prototype.initControllers = function() {
      return new HeaderController();
    };

    Application.prototype.initMediator = function() {
      return mediator.seal();
    };

    return Application;

  })(Chaplin.Application);
  
}});

window.require.define({"controllers/base/controller": function(exports, require, module) {
  var Chaplin, Controller,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  module.exports = Controller = (function(_super) {

    __extends(Controller, _super);

    function Controller() {
      return Controller.__super__.constructor.apply(this, arguments);
    }

    return Controller;

  })(Chaplin.Controller);
  
}});

window.require.define({"controllers/header-controller": function(exports, require, module) {
  var Controller, HeaderController, HeaderView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Controller = require('controllers/base/controller');

  HeaderView = require('views/header-view');

  module.exports = HeaderController = (function(_super) {

    __extends(HeaderController, _super);

    function HeaderController() {
      return HeaderController.__super__.constructor.apply(this, arguments);
    }

    HeaderController.prototype.initialize = function() {
      HeaderController.__super__.initialize.apply(this, arguments);
      return this.view = new HeaderView();
    };

    return HeaderController;

  })(Controller);
  
}});

window.require.define({"controllers/home-controller": function(exports, require, module) {
  var Controller, GalleryPageView, HomeController,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Controller = require('controllers/base/controller');

  GalleryPageView = require('views/gallery');

  module.exports = HomeController = (function(_super) {

    __extends(HomeController, _super);

    function HomeController() {
      return HomeController.__super__.constructor.apply(this, arguments);
    }

    HomeController.prototype.historyURL = 'home';

    HomeController.prototype.title = 'Home';

    HomeController.prototype.index = function() {
      return this.view = new GalleryPageView();
    };

    return HomeController;

  })(Controller);
  
}});

window.require.define({"initialize": function(exports, require, module) {
  var Application;

  Application = require('application');

  $(function() {
    var app;
    app = new Application();
    return app.initialize();
  });
  
}});

window.require.define({"lib/support": function(exports, require, module) {
  var Chaplin, support, utils;

  Chaplin = require('chaplin');

  utils = require('lib/utils');

  support = utils.beget(Chaplin.support);

  module.exports = support;
  
}});

window.require.define({"lib/utils": function(exports, require, module) {
  var Chaplin, utils;

  Chaplin = require('chaplin');

  utils = Chaplin.utils.beget(Chaplin.utils);

  module.exports = utils;
  
}});

window.require.define({"lib/view-helper": function(exports, require, module) {
  var mediator;

  mediator = require('mediator');

  Handlebars.registerHelper('with', function(context, options) {
    if (!context || Handlebars.Utils.isEmpty(context)) {
      return options.inverse(this);
    } else {
      return options.fn(context);
    }
  });

  Handlebars.registerHelper('without', function(context, options) {
    var inverse;
    inverse = options.inverse;
    options.inverse = options.fn;
    options.fn = inverse;
    return Handlebars.helpers["with"].call(this, context, options);
  });

  Handlebars.registerHelper('log', function(data) {
    return console.log(data);
  });
  
}});

window.require.define({"mediator": function(exports, require, module) {
  
  module.exports = require('chaplin').mediator;
  
}});

window.require.define({"models/base/collection": function(exports, require, module) {
  var Chaplin, Collection, Model,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  Model = require('models/base/model');

  module.exports = Collection = (function(_super) {

    __extends(Collection, _super);

    function Collection() {
      return Collection.__super__.constructor.apply(this, arguments);
    }

    Collection.prototype.model = Model;

    return Collection;

  })(Chaplin.Collection);
  
}});

window.require.define({"models/base/model": function(exports, require, module) {
  var Chaplin, Model,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  module.exports = Model = (function(_super) {

    __extends(Model, _super);

    function Model() {
      return Model.__super__.constructor.apply(this, arguments);
    }

    return Model;

  })(Chaplin.Model);
  
}});

window.require.define({"routes": function(exports, require, module) {
  
  module.exports = function(match) {};
  
}});

window.require.define({"views/base/collection-view": function(exports, require, module) {
  var Chaplin, CollectionView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  View = require('views/base/view');

  module.exports = CollectionView = (function(_super) {

    __extends(CollectionView, _super);

    function CollectionView() {
      return CollectionView.__super__.constructor.apply(this, arguments);
    }

    CollectionView.prototype.getTemplateFunction = View.prototype.getTemplateFunction;

    return CollectionView;

  })(Chaplin.CollectionView);
  
}});

window.require.define({"views/base/view": function(exports, require, module) {
  var Chaplin, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  require('lib/view-helper');

  module.exports = View = (function(_super) {

    __extends(View, _super);

    function View() {
      return View.__super__.constructor.apply(this, arguments);
    }

    View.prototype.getTemplateFunction = function() {
      return this.template;
    };

    return View;

  })(Chaplin.View);
  
}});

window.require.define({"views/gallery": function(exports, require, module) {
  var Gallery, Layout, View,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/base/view');

  Layout = require('views/layout');

  module.exports = Gallery = (function(_super) {

    __extends(Gallery, _super);

    function Gallery() {
      this.loadMore = __bind(this.loadMore, this);

      this.format = __bind(this.format, this);

      this.getGallery = __bind(this.getGallery, this);

      this.initialize = __bind(this.initialize, this);
      return Gallery.__super__.constructor.apply(this, arguments);
    }

    Gallery.prototype.autoRender = true;

    Gallery.prototype.className = 'gallery-page';

    Gallery.prototype.container = '#page-container';

    Gallery.prototype.containerMethod = 'append';

    Gallery.prototype.template = require('views/templates/gallery');

    Gallery.prototype.initialize = function() {
      this.page = 2;
      $(window).bind('scroll', this.loadMore);
      $('.gallery-page').remove();
      return this.getGallery();
    };

    Gallery.prototype.getGallery = function() {
      var _this = this;
      return $.ajax({
        dataType: 'jsonp',
        url: 'http://api.dribbble.com/shots/' + this.options.viewType + '/?page=' + this.options.page + '&per_page=9',
        success: function(data) {
          _.each(data.shots, _this.format);
          return _this.wait = false;
        }
      });
    };

    Gallery.prototype.format = function(shot) {
      return this.subview = new (require('views/shot'))({
        shot: shot
      });
    };

    Gallery.prototype.loadMore = function() {
      if ($(window).scrollTop() > $(document).height() - $(window).height() && this.wait !== true) {
        this.wait = true;
        this.page++;
        this.options.page = this.page;
        return this.getGallery();
      }
    };

    return Gallery;

  })(View);
  
}});

window.require.define({"views/header-view": function(exports, require, module) {
  var HeaderView, View, template,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/base/view');

  template = require('views/templates/header');

  module.exports = HeaderView = (function(_super) {

    __extends(HeaderView, _super);

    function HeaderView() {
      this.changeView = __bind(this.changeView, this);
      return HeaderView.__super__.constructor.apply(this, arguments);
    }

    HeaderView.prototype.autoRender = true;

    HeaderView.prototype.className = 'header';

    HeaderView.prototype.container = '#header-container';

    HeaderView.prototype.id = 'header';

    HeaderView.prototype.template = template;

    HeaderView.prototype.events = {
      'click a': 'changeView'
    };

    HeaderView.prototype.changeView = function(e) {
      var _view;
      _view = $(e.currentTarget).attr('class');
      this.subview = new (require('views/gallery'))({
        viewType: _view
      });
      return false;
    };

    return HeaderView;

  })(View);
  
}});

window.require.define({"views/home-page-view": function(exports, require, module) {
  var HomePageView, View, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  template = require('views/templates/home');

  View = require('views/base/view');

  module.exports = HomePageView = (function(_super) {

    __extends(HomePageView, _super);

    function HomePageView() {
      return HomePageView.__super__.constructor.apply(this, arguments);
    }

    HomePageView.prototype.autoRender = true;

    HomePageView.prototype.className = 'home-page';

    HomePageView.prototype.container = '#page-container';

    HomePageView.prototype.template = template;

    return HomePageView;

  })(View);
  
}});

window.require.define({"views/layout": function(exports, require, module) {
  var Chaplin, Layout,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  module.exports = Layout = (function(_super) {

    __extends(Layout, _super);

    function Layout() {
      return Layout.__super__.constructor.apply(this, arguments);
    }

    Layout.prototype.initialize = function() {
      return this.gallery = new (require('views/gallery'))({
        viewType: 'popular'
      });
    };

    return Layout;

  })(Chaplin.Layout);
  
}});

window.require.define({"views/shot": function(exports, require, module) {
  var Layout, Shot, View,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/base/view');

  Layout = require('views/layout');

  module.exports = Shot = (function(_super) {

    __extends(Shot, _super);

    function Shot() {
      this.afterRender = __bind(this.afterRender, this);

      this.initialize = __bind(this.initialize, this);
      return Shot.__super__.constructor.apply(this, arguments);
    }

    Shot.prototype.autoRender = true;

    Shot.prototype.className = 'shot-view';

    Shot.prototype.container = '#gallery-view';

    Shot.prototype.template = require('views/templates/shot');

    Shot.prototype.events = {
      'mouseover a.image': 'showTip',
      'mouseout a.image': 'hideTip'
    };

    Shot.prototype.initialize = function() {};

    Shot.prototype.afterRender = function() {
      this.$el.fadeIn();
      return Shot.__super__.afterRender.apply(this, arguments);
    };

    Shot.prototype.getTemplateData = function() {
      return {
        shot: this.options.shot
      };
    };

    Shot.prototype.showTip = function() {
      return this.$el.find('.tip').fadeIn();
    };

    Shot.prototype.hideTip = function() {
      return this.$el.find('.tip').fadeOut();
    };

    return Shot;

  })(View);
  
}});

window.require.define({"views/templates/gallery": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    


    return "<div id=\"gallery-view\">\n	\n</div>";});
}});

window.require.define({"views/templates/header": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    


    return "<h1>Dribble Galleries</h1>\n<ul>\n	<li><a class=\"popular\" href=\"#\">popular shots</a></li>\n	<li><a class=\"debuts\" href=\"#\">debuts</a></li>\n	<li><a class=\"everyone\" href=\"#\">everyone</a></li>\n</ul>\n\n\n";});
}});

window.require.define({"views/templates/home": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    


    return "<a href=\"http://brunch.io/\">\n  <img src=\"http://brunch.io/images/brunch.png\" alt=\"Brunch\" />\n</a>\n";});
}});

window.require.define({"views/templates/shot": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


    buffer += "<div id=\"shot-";
    stack1 = depth0.shot;
    stack1 = stack1 == null || stack1 === false ? stack1 : stack1.id;
    stack1 = typeof stack1 === functionType ? stack1() : stack1;
    buffer += escapeExpression(stack1) + "\" class=\"shot\">\n	<a class=\"image\" style=\"background-image: url(";
    stack1 = depth0.shot;
    stack1 = stack1 == null || stack1 === false ? stack1 : stack1.image_url;
    stack1 = typeof stack1 === functionType ? stack1() : stack1;
    buffer += escapeExpression(stack1) + ")\" href=\"";
    stack1 = depth0.shot;
    stack1 = stack1 == null || stack1 === false ? stack1 : stack1.url;
    stack1 = typeof stack1 === functionType ? stack1() : stack1;
    buffer += escapeExpression(stack1) + "\" target=\"_blank\"></a>\n	<div class=\"tip\">\n		<p>";
    stack1 = depth0.shot;
    stack1 = stack1 == null || stack1 === false ? stack1 : stack1.title;
    stack1 = typeof stack1 === functionType ? stack1() : stack1;
    buffer += escapeExpression(stack1) + "</p>\n	</div>\n</div>";
    return buffer;});
}});

window.require.define({"views/templates/tip": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "";


    return buffer;});
}});

window.require.define({"views/tip": function(exports, require, module) {
  var Tip, View,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/base/view');

  module.exports = Tip = (function(_super) {

    __extends(Tip, _super);

    function Tip() {
      this.afterRender = __bind(this.afterRender, this);

      this.initialize = __bind(this.initialize, this);
      return Tip.__super__.constructor.apply(this, arguments);
    }

    Tip.prototype.autoRender = false;

    Tip.prototype.className = 'tip-view';

    Tip.prototype.container = '#shot-view';

    Tip.prototype.template = require('views/templates/tip');

    Tip.prototype.initialize = function() {
      return this.render();
    };

    Tip.prototype.afterRender = function() {
      this.$el.fadeIn();
      return Tip.__super__.afterRender.apply(this, arguments);
    };

    Tip.prototype.getTemplateData = function() {
      return {
        tip: this.options.tip
      };
    };

    return Tip;

  })(View);
  
}});

