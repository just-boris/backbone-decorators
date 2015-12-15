import {Collection} from 'backbone';
import {ItemView, CollectionView} from 'backbone.marionette';
import {onChild, childView} from '../../src/backbone-decorators';
import {expect} from 'chai';

describe('@onChild decorator', () => {
    it('should bind listeners to model', () => {
        class DerivedView extends ItemView {
            template() {
                return '';
            }

            notifyParent() {
                this.trigger('notification');
            }
        }

        @childView(DerivedView)
        class MyView extends CollectionView {
            @onChild('notification')
            handleChildEvent() {
                this.childNotificated = true;
            }
        }

        var collection = new Collection([{id: 1}, {id: 2}]);
        var view = new MyView({collection}).render();

        view.children.first().notifyParent();
        expect(view.childNotificated).to.be.ok;
    });
});
