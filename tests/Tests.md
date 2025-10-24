# Tests
#### La siguiente documentación muestra la integración de la solución de Pagos Instantáneos de Khipu en el sitio web de Nassimba Store.
#### A continuación se pueden visualizar los diferentes test a la API de Khipu en entorno de desarrollo y el flujo completo de la compra luego de integrar el botón de pago.

## Pruebas a los Endpoints
### Creación de pago
![imagen prueba](img/1.creacion_pago.jpg)
### Pago sin monto
![image alt](img/2.pago_sin_monto.jpg)
### Pago sin email
![image alt](img/3.pago_sin_email.jpg)
### Status del pago
![image alt](img/4.1.status_pago_done.jpg)
![image alt](img/4.2.status_pago_pending.jpg)
### Status de pago inexistente
![image alt](img/5.status_pago_inexistente.jpg)
### WebHook de notitificación de pago exitoso
![image alt](img/6.webhook_pago_exitoso.jpg)
### Detalle pagos creados
![image alt](img/7.pagos_creados.jpg)
### Detalle de un pago en específico
![image alt](img/8.detalle_pago.jpg)
### Bancos disponibles
![image alt](img/9.bancos_disponibles.jpg)
### Confirmar pago manual
##### No fue posible de utilizar
### Borrar pago
![image alt](img/11.borrar_pago.jpg)
### Devolución pago
![image alt](img/12.devolucion_manual.jpg)
### Métodos de pago
![image alt](img/14.metodo_pago.jpg)
### Crear nueva cuenta de cobro
##### No fue posible de utilizar


## Pruebas Flujo completo

### Escenario 1 - Compra Exitosa
![image alt](img/Compra%20exitosa/1.seleccion_producto.jpg)
![image alt](img/Compra%20exitosa/2.carrito.jpg)
![image alt](img/Compra%20exitosa/3.1.datos_comprador.jpg)
![image alt](img/Compra%20exitosa/3.2.datos_comprador.jpg)
![image alt](img/Compra%20exitosa/4.resumen.jpg)
![image alt](img/Compra%20exitosa/5.0.metodo_pago.jpg)

#### Demo Bank
![image alt](img/Compra%20exitosa/5.1.acceso_demo_bank.jpg)
![image alt](img/Compra%20exitosa/5.2.seleccion_cuenta.jpg)
![image alt](img/Compra%20exitosa/5.3.codigo_seguridad.jpg)
![image alt](img/Compra%20exitosa/5.4.pago_en_proceso_khipu.jpg)
![image alt](img/Compra%20exitosa/5.5.verificando_pago.jpg)
![image alt](img/Compra%20exitosa/5.6.pago_confirmado.jpg)

#### Transferencia Manual
![image alt](img/Compra%20exitosa/6.1.pago_transferencia.jpg)
![image alt](img/Compra%20exitosa/6.2.datos_transferencia.jpg)
![image alt](img/Compra%20exitosa/6.3.ingreso_banco.jpg)
![image alt](img/Compra%20exitosa/6.3.transferencia.jpg)
![image alt](img/Compra%20exitosa/6.4.pago_exitoso.jpg)

### Escenario 2 - Pago Cancelado
#### "Volver al sitio de origen"
![image alt](img/Pago%20cancelado/5.metodo_pago.jpg)
![image alt](img/Pago%20cancelado/6.pago_cancelado.jpg)
