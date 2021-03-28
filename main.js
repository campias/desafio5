window.onload = function () {
            const baseDeDatos = [
                {
                    id: 1,
                    nombre: 'Medialuna',
                    precio: 45,
                },
                {
                    id: 2,
                    nombre: 'Chipa x 100g',
                    precio: 70,
                },
                {
                    id: 3,
                    nombre: 'Cafe',
                    precio: 100,
                },
                {
                    id: 4,
                    nombre: 'Exprimido',
                    precio: 120,
                }

            ];
            
            const $items = document.querySelector('#items');
            let carrito = [];
            let total = 0;
            const $carrito = document.querySelector('#carrito');
            const $total = document.querySelector('#total');
            const $botonVaciar = document.querySelector('#boton-vaciar');

            // Funciones
            function renderItems() {
                for (let info of baseDeDatos) {
                    let miNodo = document.createElement('div');
                    miNodo.classList.add('card', 'col-sm-4');
                    let miNodoCardBody = document.createElement('div');
                    miNodoCardBody.classList.add('card-body');
                    let miNodoTitle = document.createElement('h5');
                    miNodoTitle.classList.add('card-title');
                    miNodoTitle.textContent = info['nombre'];
                    let miNodoPrecio = document.createElement('p');
                    miNodoPrecio.classList.add('card-text');
                    miNodoPrecio.textContent = info['precio'] + '$';
                    let miNodoBoton = document.createElement('button');
                    miNodoBoton.classList.add('btn', 'btn-primary');
                    miNodoBoton.textContent = '+';
                    miNodoBoton.setAttribute('marcador', info['id']);
                    miNodoBoton.addEventListener('click', anyadirCarrito);
                    
                    miNodoCardBody.appendChild(miNodoTitle);
                    miNodoCardBody.appendChild(miNodoPrecio);
                    miNodoCardBody.appendChild(miNodoBoton);
                    miNodo.appendChild(miNodoCardBody);
                    $items.appendChild(miNodo);
                }
            }

            function anyadirCarrito () {
                carrito.push(this.getAttribute('marcador'))
                calcularTotal();
                renderizarCarrito();
            }

            function renderizarCarrito() {
                $carrito.textContent = '';
                let carritoSinDuplicados = [...new Set(carrito)];
                carritoSinDuplicados.forEach(function (item, indice) {
                    let miItem = baseDeDatos.filter(function(itemBaseDatos) {
                        return itemBaseDatos['id'] == item;
                    });
                    let numeroUnidadesItem = carrito.reduce(function (total, itemId) {
                        return itemId === item ? total += 1 : total;
                    }, 0);
                    let miNodo = document.createElement('li');
                    miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
                    miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0]['nombre']} - ${miItem[0]['precio']}$`;
                    miNodo.appendChild(miBoton);
                    $carrito.appendChild(miNodo);
                });
            }

            function borrarItemCarrito() {
                let id = this.getAttribute('item');
                carrito = carrito.filter(function (carritoId) {
                    return carritoId !== id;
                });
                renderizarCarrito();
                calcularTotal();
            }

            function calcularTotal() {
                total = 0;
                for (let item of carrito) {
                    let miItem = baseDeDatos.filter(function(itemBaseDatos) {
                        return itemBaseDatos['id'] == item;
                    });
                    total = total + miItem[0]['precio'];
                }
                let totalDosDecimales = total.toFixed(2);
                $total.textContent = totalDosDecimales;
            }

            function vaciarCarrito() {
                carrito = [];
                renderizarCarrito();
                calcularTotal();
            }

            $botonVaciar.addEventListener('click', vaciarCarrito);

            renderItems();
        } 
