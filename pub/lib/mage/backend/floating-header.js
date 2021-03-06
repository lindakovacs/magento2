/**
 * Magento
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License (AFL 3.0)
 * that is bundled with this package in the file LICENSE_AFL.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/afl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@magentocommerce.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade Magento to newer
 * versions in the future. If you wish to customize Magento for your
 * needs please refer to http://www.magentocommerce.com for more information.
 *
 * @category    Mage
 * @package     Mage_Adminhtml
 * @copyright   Copyright (c) 2013 X.commerce, Inc. (http://www.magentocommerce.com)
 * @license     http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */
/*jshint browser:true jquery:true */
(function($) {
    "use strict";
    $.widget('mage.floatingHeader', {
        options: {
            placeholderAttrs: {
                'class': 'content-header-placeholder'
            },
            fixedClass: 'fixed'
        },

        /**
         * Widget initialization
         * @private
         */
        _create: function() {
            this._setVars();
            this._bind();
        },

        /**
         * Set privat variables on load, for performance purposes
         * @private
         */
        _setVars: function() {
            this._placeholder = this.element.before($('<div/>', this.options.placeholderAttrs)).prev();
            this._offsetTop = this._placeholder.offset().top;
            this._height = this.element.outerHeight(true);
        },

        /**
         * Event binding, will monitor scroll and resize events (resize events left for backward compat)
         * @private
         */
        _bind: function() {
            this._on(window, {
                scroll: this._handlePageScroll,
                resize: this._handlePageScroll
            });
        },

        /**
         * Event handler for setting fixed positioning
         * @event
         * @private
         */
        _handlePageScroll: function() {
            var isActive = ($(window).scrollTop() > this._offsetTop);
            this.element
                [isActive ? 'addClass': 'removeClass'](this.options.fixedClass);
            this._placeholder.height(isActive ? this._height: '');
        },

        /**
         * Widget destroy functionality
         * @private
         */
        _destroy: function() {
            this._placeholder.remove();
            this._off($(window));
        }
    });
})(jQuery);
