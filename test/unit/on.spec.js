import {View} from 'backbone';
import $ from 'jquery';
import {on} from '../../src/backbone-decorators';
import {expect} from 'chai';

describe('@on decorator', () => {
    it('should gather events configuration from decorated functions', () => {
        class MyView extends View {
            @on('click')
            handleViewClick() {
                this.viewClicked = true;
            }

            @on('click .item')
            handleItemClick() {
                this.itemClicked = true;
            }
        }

        var element = $('<div><span class="item"></span></div>')
        var view = new MyView({el: element});
        sinon.spy(view, "handleViewClick");

        element.trigger('click');
        expect(view.viewClicked).to.be.ok;

        element.find('.item').trigger('click');
        expect(view.itemClicked).to.be.ok;
    });
});
