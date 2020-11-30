import { Injectable } from '@angular/core';
import { TestInfo, SubRespuestaInfo } from '../interfaces/interfaces-grupo-mpe';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  arrayTest: TestInfo[];
  testSelec: TestInfo;
  subRespuesta: SubRespuestaInfo;
  respuestasMarcadas = 0;


  constructor() { }

  guardarArrayTest(arrayTest: TestInfo[]) {
    console.log('ARRAY TEST: ', arrayTest);
    this.arrayTest = arrayTest;
  }

  getArrayTest(): TestInfo[] {

    return this.arrayTest;

  }

  guardarTest(test: TestInfo) {

    this.testSelec = test;
    console.log('SERVICE TEST: ', this.testSelec);
  }

  getTest(): TestInfo {
    console.log('SERVICE TEST 2: ', this.testSelec);
    return this.testSelec;

  }

  guardarSubRespuestas(subRespuestas: SubRespuestaInfo) {

    this.subRespuesta = subRespuestas;

  }

  getSubRespuesta(): SubRespuestaInfo {

    return this.subRespuesta;

  }

  guardarRespuestaMarcada() {

    this.respuestasMarcadas++;

  }


}
