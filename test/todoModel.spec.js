import {expect} from 'chai';
import TodoModel from '../js/todoModel';

describe('test model', () => {
    let todoModel = new TodoModel('todoz');
    it('sould do things', () => {
        expect(todoModel).to.have.property('save');
        expect(todoModel).to.have.property('subscribe');
        expect(todoModel).to.have.property('inform');
    });
});
