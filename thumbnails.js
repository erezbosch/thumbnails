$.Thumbnails = function (el) {
  this.$el = $(el);
  this.$gutterImages = this.$el.find(".gutter-images");
  this.$gutterChildren = this.$gutterImages.children();
  this.gutterIdx = 0;
  this.$activeImg = this.$gutterImages.find(":first-child");
  this.activate(this.$activeImg);
  this.$gutterImages.on("click", "img", this.handleClick.bind(this));
  this.$gutterImages.on("mouseenter", "img", this.mouseEnter.bind(this));
  this.$gutterImages.on("mouseleave", "img", this.mouseLeave.bind(this));
  this.$el.find('.nav').on("click", this.changeGutter.bind(this));
  this.fillGutterImages();
}

$.Thumbnails.prototype.changeGutter = function (e) {
  var $nav = $(e.currentTarget);
  var dir = $nav.is($('.nav').eq(0)) ? -1 : 1;
  if (this.gutterIdx + dir < 0 ||
      this.gutterIdx + dir > this.$gutterChildren.length - 5) {
    return;
  }
  this.gutterIdx += dir;
  this.fillGutterImages();
}

$.Thumbnails.prototype.handleClick = function (e) {
  var $thumbnail = $(e.currentTarget);
  this.$activeImg = $thumbnail;
  this.activate(this.$activeImg);
}

$.Thumbnails.prototype.mouseEnter = function (e) {
  var $img = $(e.currentTarget);
  this.activate($img);
}

$.Thumbnails.prototype.mouseLeave = function () {
  this.activate(this.$activeImg);
}

$.Thumbnails.prototype.activate = function ($img) {
  $('.active').empty();
  $img.clone(true).appendTo(".active");
}

$.Thumbnails.prototype.fillGutterImages = function () {
  this.$gutterImages.empty();
  for (var i = this.gutterIdx;
       i < this.gutterIdx + 5 && i < this.$gutterChildren.length;
       i++) {
    this.$gutterImages.append(this.$gutterChildren.eq(i));
  }
}

$.fn.thumbnails = function () {
  return this.each(function () {
    new $.Thumbnails(this);
  });
}
