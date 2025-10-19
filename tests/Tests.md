# Tests
#### La siguiente documentación muestra la integración de la solución de Pagos Instantáneos de Khipu en el sitio web de Nassimba Store.
#### A continuación se pueden visualizar los diferentes test a la API de Khipu en entorno de desarrollo y el flujo completo de la compra luego de integrar el botón de pago.

## Pruebas a los Endpoints
### Creación de pago
![image alt](https://github.com/PatricioSaavedraV/integracion-khipu/blob/fc6ccf0963fbe2a73a3f44ad924c8e02a43ccba8/tests/img/1.creacion_pago.png)
### Pago sin monto
![image alt](https://github.com/PatricioSaavedraV/integracion-khipu/blob/fc6ccf0963fbe2a73a3f44ad924c8e02a43ccba8/tests/img/2.pago_sin_monto.png)
### Pago sin email
![image alt](https://github.com/PatricioSaavedraV/integracion-khipu/blob/fc6ccf0963fbe2a73a3f44ad924c8e02a43ccba8/tests/img/3.pago_sin_email.png)
### Status del Pago
![image alt](https://github.com/PatricioSaavedraV/integracion-khipu/blob/fc6ccf0963fbe2a73a3f44ad924c8e02a43ccba8/tests/img/4.1.status_pago_done.png)
![image alt](https://github.com/PatricioSaavedraV/integracion-khipu/blob/fc6ccf0963fbe2a73a3f44ad924c8e02a43ccba8/tests/img/4.2.status_pago_pending.png)
### Status de pago inexistente
![image alt](https://github.com/PatricioSaavedraV/integracion-khipu/blob/fc6ccf0963fbe2a73a3f44ad924c8e02a43ccba8/tests/img/5.status_pago_inexistente.png)
### WebHook de notitificación de pago exitoso
![image alt](https://github.com/PatricioSaavedraV/integracion-khipu/blob/fc6ccf0963fbe2a73a3f44ad924c8e02a43ccba8/tests/img/6.webhook_pago_exitoso.png)
### Detalle pagos creados
![image alt](https://github.com/PatricioSaavedraV/integracion-khipu/blob/fc6ccf0963fbe2a73a3f44ad924c8e02a43ccba8/tests/img/7.pagos_creados.png)
### Detalle de un pago en específico
![image alt](https://github.com/PatricioSaavedraV/integracion-khipu/blob/fc6ccf0963fbe2a73a3f44ad924c8e02a43ccba8/tests/img/8.detalle_pago.png)

## Pruebas Flujo completo

### Escenario 1 - Compra Exitosa
![image alt](https://github.com/PatricioSaavedraV/integracion-khipu/blob/fc6ccf0963fbe2a73a3f44ad924c8e02a43ccba8/tests/img/Compra%20exitosa/1.seleccion_producto.png)
![image alt](https://github.com/PatricioSaavedraV/integracion-khipu/blob/fc6ccf0963fbe2a73a3f44ad924c8e02a43ccba8/tests/img/Compra%20exitosa/2.carrito.png)
![image alt](https://github.com/PatricioSaavedraV/integracion-khipu/blob/fc6ccf0963fbe2a73a3f44ad924c8e02a43ccba8/tests/img/Compra%20exitosa/3.1.datos_comprador.png)
![image alt](https://github.com/PatricioSaavedraV/integracion-khipu/blob/fc6ccf0963fbe2a73a3f44ad924c8e02a43ccba8/tests/img/Compra%20exitosa/3.2.datos_comprador.png)
![image alt](https://github.com/PatricioSaavedraV/integracion-khipu/blob/fc6ccf0963fbe2a73a3f44ad924c8e02a43ccba8/tests/img/Compra%20exitosa/4.resumen.png)
![image alt](https://github.com/PatricioSaavedraV/integracion-khipu/blob/fc6ccf0963fbe2a73a3f44ad924c8e02a43ccba8/tests/img/Compra%20exitosa/5.0.metodo_pago.png)

#### Demo Bank
![image alt](https://github.com/PatricioSaavedraV/integracion-khipu/blob/fc6ccf0963fbe2a73a3f44ad924c8e02a43ccba8/tests/img/Compra%20exitosa/5.1.acceso_demo_bank.png)
![image alt](https://github.com/PatricioSaavedraV/integracion-khipu/blob/fc6ccf0963fbe2a73a3f44ad924c8e02a43ccba8/tests/img/Compra%20exitosa/5.2.seleccion_cuenta.png)
![image alt](https://github.com/PatricioSaavedraV/integracion-khipu/blob/fc6ccf0963fbe2a73a3f44ad924c8e02a43ccba8/tests/img/Compra%20exitosa/5.3.codigo_seguridad.png)
![image alt](https://github.com/PatricioSaavedraV/integracion-khipu/blob/fc6ccf0963fbe2a73a3f44ad924c8e02a43ccba8/tests/img/Compra%20exitosa/5.4.pago_en_proceso_khipu.png)
![image alt](https://github.com/PatricioSaavedraV/integracion-khipu/blob/fc6ccf0963fbe2a73a3f44ad924c8e02a43ccba8/tests/img/Compra%20exitosa/5.5.verificando_pago.png)
![image alt](https://github.com/PatricioSaavedraV/integracion-khipu/blob/fc6ccf0963fbe2a73a3f44ad924c8e02a43ccba8/tests/img/Compra%20exitosa/5.6.pago_confirmado.png)

#### Transferencia Manual
![image alt](https://github.com/PatricioSaavedraV/integracion-khipu/blob/fc6ccf0963fbe2a73a3f44ad924c8e02a43ccba8/tests/img/Compra%20exitosa/6.1.pago_transferencia.png)
![image alt](https://github.com/PatricioSaavedraV/integracion-khipu/blob/fc6ccf0963fbe2a73a3f44ad924c8e02a43ccba8/tests/img/Compra%20exitosa/6.2.datos_transferencia.png)
![image alt](https://github.com/PatricioSaavedraV/integracion-khipu/blob/fc6ccf0963fbe2a73a3f44ad924c8e02a43ccba8/tests/img/Compra%20exitosa/6.3.ingreso_banco.png)
![image alt](https://github.com/PatricioSaavedraV/integracion-khipu/blob/fc6ccf0963fbe2a73a3f44ad924c8e02a43ccba8/tests/img/Compra%20exitosa/6.3.transferencia.png)
![image alt](https://github.com/PatricioSaavedraV/integracion-khipu/blob/fc6ccf0963fbe2a73a3f44ad924c8e02a43ccba8/tests/img/Compra%20exitosa/6.4.pago_exitoso.png)

### Escenario 2 - Pago Cancelado
#### "Volver al sitio de origen"
![image alt](https://github.com/PatricioSaavedraV/integracion-khipu/blob/fc6ccf0963fbe2a73a3f44ad924c8e02a43ccba8/tests/img/Pago%20cancelado/5.metodo_pago.png)
![image alt](https://github.com/PatricioSaavedraV/integracion-khipu/blob/fc6ccf0963fbe2a73a3f44ad924c8e02a43ccba8/tests/img/Pago%20cancelado/6.pago_cancelado.png)
