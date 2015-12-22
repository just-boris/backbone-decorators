import {Model} from 'backbone';
import {ItemView} from 'backbone.marionette';
import {onModel} from '../../src/backbone-decorators';
import {expect} from 'chai';

describe('@onModel decorator', () => {
    it('should bind listeners to model', () => {
        class MyView extends ItemView {
            @onModel('change')
            handleModelUpdate() {
                this.modelUpdated = true;
            }
        }

        var model = new Model();
        var view = new MyView({model});

        model.set('test', 'value');
        expect(view.modelUpdated).to.be.ok;
    });
});
