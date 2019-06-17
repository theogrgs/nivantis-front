import Vue from 'vue'
import Calculatrice from '@/components/Calculatrice'

describe('Calculatrice.vue',() => {
    it('should return -25', () => {
        const Constructor = Vue.extend(Calculatrice)
        const vm = new Constructor().$mount()
        vm.panet = 8
        vm.pabrut = 10
        vm.calcTauxRemise()
        expect(vm.tauxremise).toBe(20)
    })
})
/*
import {calcTauxRemise, calcPrixAchatNet, calcPrixVenteNet, calcCoeffMultiplicateur} from './components/Calculatrice/calculator';

test('calcTauxRemise', () => {
    const value = calcTauxRemise(10, 8);
    expect(value).toBe(-25);
});

test('calcPrixAchatNet', () => {
    const value = calcPrixAchatNet(8, -25);
    expect(value).toBe(10);
});

test('calcPrixVenteNet', () => {
    const value = calcPrixVenteNet(10, 1.1);
    expect(value).toBe(11);
});

test('calcCoeffMultiplicateur', () => {
    const value = calcCoeffMultiplicateur(15, 10);
    expect(value).toBe(1.5);
});*/