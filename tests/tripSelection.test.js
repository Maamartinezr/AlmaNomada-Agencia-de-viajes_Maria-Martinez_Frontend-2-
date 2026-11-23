import { test } from 'node:test';
import assert from 'node:assert/strict';
import { initialTrip, removeTripSelection } from '../frontend/src/utils/tripSelection.js';
import { estimateSelection } from '../frontend/src/utils/travel.js';
const selected = { ...initialTrip, destino:{id:'demo'}, vuelo:{id:'v1',precio:100000,moneda:'CLP'}, hotel:{id:'h1',precioPorNoche:50000,moneda:'CLP'}, tipoViaje:'solo-ida', noches:3, extras:['transfer-standard','city-tour'], extrasReviewed:true };
test('Eliminar un servicio conserva el resto y descuenta únicamente su importe',()=>{
  const before=structuredClone(selected);
  const next=removeTripSelection(selected,'extra','transfer-standard');
  assert.deepEqual(selected,before);
  assert.deepEqual(next.extras,['city-tour']);
  assert.equal(estimateSelection(selected).total-estimateSelection(next).total,60000);
  assert.equal(next.hotel,selected.hotel);
});
test('Eliminar hotel conserva vuelo, limpia servicios y calcula subtotal sin alojamiento',()=>{
  const next=removeTripSelection(selected,'hotel');
  assert.equal(next.hotel,null); assert.equal(next.vuelo,selected.vuelo);
  assert.deepEqual(next.extras,[]); assert.equal(next.extrasReviewed,false);
  assert.equal(estimateSelection(next).total,100000);
});
test('Eliminar vuelo quita sus dependencias y conserva el destino',()=>{
  const next=removeTripSelection(selected,'vuelo');
  assert.equal(next.destino,selected.destino); assert.equal(next.vuelo,null); assert.equal(next.hotel,null);
  assert.deepEqual(next.extras,[]); assert.equal(estimateSelection(next).total,0);
});
test('Eliminar destino vacía la planificación y quitar todos los extras conserva vuelo y hotel',()=>{
  assert.deepEqual(removeTripSelection(selected,'destino'),initialTrip);
  const next=removeTripSelection(selected,'extras');
  assert.equal(next.vuelo,selected.vuelo); assert.equal(next.hotel,selected.hotel);
  assert.deepEqual(next.extras,[]); assert.equal(next.extrasReviewed,true);
  assert.equal(estimateSelection(next).total,250000);
});
