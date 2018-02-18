import {TodoPage} from './todo-list.po';
import {browser, protractor} from 'protractor';

let origFn = browser.driver.controlFlow().execute;

//https://hassantariqblog.wordpress.com/2015/11/09/reduce-speed-of-angular-e2e-protractor-tests/
browser.driver.controlFlow().execute = function () {
  let args = arguments;

  // queue 100ms wait between test
  //This delay is only put here so that you can watch the browser do its' thing.
  //If you're tired of it taking long you can remove this call
  origFn.call(browser.driver.controlFlow(), function () {
    return protractor.promise.delayed(100);
  });

  return origFn.apply(browser.driver.controlFlow(), args);
};

describe('Todo list', () => {
  let page: TodoPage;

  beforeEach(() => {
    page = new TodoPage();
  });

  it('should get and highlight Todo Owner attribute ', () => {
    page.navigateTo();
    expect(page.getTodoTitle()).toEqual('Todos');
  });

  it('should type something in filter owner text field and check that it returned correct element', () => {
    page.navigateTo();
    page.typeAnOwner("d");
    expect(page.getUniqueTodo("homework")).toEqual("Dawn");
    page.backspace();
    page.typeAnOwner("f")
    expect(page.getUniqueTodo("video games")).toEqual("Fry");
  });

  it('should type something in filter category text field and check that it returned correct element', () => {
    page.navigateTo();
    page.typeACategory("gro");
    expect(page.getUniqueTodo("groceries")).toEqual("Blanche");
    page.repeatBackspace(3);
    page.typeAnOwner("f")
    page.typeACategory("vide");
    expect(page.getUniqueTodo("video games")).toEqual("Fry");
  });

  it('should type something in filter body text field and check that it returned correct element', () => {
    page.navigateTo();
    page.typeABody("est");
    expect(page.getUniqueTodo("video games")).toEqual("Fry");
    page.repeatBackspace(3);
    page.typeABody("pari");
    expect(page.getUniqueTodo("video games")).toEqual("Barry");
  });

  it('should type something in filter status text field and check that it returned correct element', () => {
    page.navigateTo();
    page.typeAStatus("complete");
    expect(page.getUniqueTodo("homework")).toEqual("Fry");
    page.repeatBackspace(8);
    page.typeAStatus("incomplete");
    expect(page.getUniqueTodo("software design")).toEqual("Blanche");
  });


});
