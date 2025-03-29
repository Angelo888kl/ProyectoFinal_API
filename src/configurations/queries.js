export const quieries = {
    get_restaurantes: "SELECT id_restaurante,local,nombre,direccion,telefono FROM restaurante;",
    get_restaurante: "SELECT id_restaurante,local,nombre,direccion,telefono FROM restaurante WHERE id_restaurante = ?;",
    post_restaurante: "INSERT INTO restaurante (id_restaurante, local, nombre, direccion, telefono) VALUES (?,?,?,?,?)",
    update_restaurante: "UPDATE restaurante SET local = ?,nombre = ?,direccion = ?,telefono = ? WHERE  id_restaurante = ?",
    delete_restaurante: "DELETE FROM restaurante WHERE id_restaurante = ?",

    get_telefonos: "SELECT id_telfonico, num_telefono_movil, num_telefono_fijo FROM telefono",
    get_telefono: "SELECT id_telefonico, num_telefono_movil, num_telefono_fijo FROM telefono WHERE id_telefonico = ?",
    post_telefono: "INSERT INTO telefono (id_telefonico, num_telefono_movil, num_telefono_fijo) VALUES (?,?,?)",
    update_telefono: "UPDATE telefono SET num_telefono_movil = ?, num_telefono_fijo = ? WHERE id_telefonico = ?",
    delete_telefono: "DELTE FROM telefono WHERE id_telefonico = ?",

    get_direcciones: "SELECT id_direcciones,provincia,canton,distrito,direccion FROM direcciones",
    get_direccion: "SELECT id_direcciones,provincia,canton,distrito,direccion FROM direccion WHERE id_direcciones = ?",
    post_direccion: "INSERT INTO direcciones (id_direcciones, provincia, canton, distrito, direccion) VALUES (?,?,?,?,?)",
    update_direccion: "UPDATE direcciones SET provincia = ?,canton = ?,distrito = ?,direccion = ? WHERE id_direcciones = ?",
    delete_direccion: "DELTE FROM direcciones WHERE id_direcciones",

    

    
    get_mesas: "SELECT id_mesas,restaurante,descripcion,reservada FROM mesa",
    get_mesa: "SELECT id_mesas,restaurante,descipcion,reservada FROM mesa WHERE id_mesas = ?",
    post_mesa: "INSERT INTO mesa (restaurante,descripcion,reservada) VALUES(?,?,?)",
    update_mesa: "UPDATE mesa SET restaurante = ?,descripcion = ?, reservada = ? WHERE id_mesas = ?",
    delete_mesa: "DELTE FROM mesa WHERE id_mesas",

    get_menus: "SELECT id_menu,nombre,restaurante FROM menu",
    get_menu: "SELECT id_menu,nombre,restaurante FROM menu WHERE id_menu = ?",
    post_menu: "INSERT INTO menu (nombre,restaurante) VALUES(?,?)",
    update_menu: "UPDATE menu SET nombre = ?,restaurante = ? WHERE id_menu = ?",
    delete_menu: "DELTE FROM menu WHERE id_menu",

    get_inventarios: "SELECT id_inventario,restaurante,articulo,cantidad,fecha_caducidad FROM inventario",
    get_inventario: "SELECT id_inventario,restaurante,articulo,cantidad,fecha_caducidad FROM inventario WHERE id_inventario = ?",
    post_inventario: "INSTER INTO inventario (restaurante,articulo,cantidad,fecha_caducidad) VALUES(?,?,?,?)",
    update_inventario: "UPDATE inventario SET restaurante = ?,articulo = ?,cantidad = ?,fecha_caducidad = ? WHERE id_inventario = ?",
    delete_inventario: "DELTE FROM inventario WHERE id_inventario",

    get_ingredintes_platillos: "SELECT id_ingredintes_platillo,ingrediente,platillo FROM ingredientes_platillo",
    get_ingredinte_platillo: "SELECT id_ingredintes_platillo,ingrediente,platillo FROM ingredientes_platillo WHERE id_ingredientes_platillo = ?",
    post_ingrediente_platillo: "INSTER INTO ingredientes_platillo (ingredientes,platillo) VALUES(?,?)",
    update_ingredinte_platillo: "UPDATE ingredientes_platillo SET ingredintes = ?,platillo = ?  WHERE id_ingredientes_platillo = ?",
    delete_ingredinte_platillo: "DELTE FROM ingredientes_platillo WHERE id_ingredientes_platillo",

    get_clientes: "SELECT id_clientes,restaurante,nombre,apellido,direccio,telefono FROM cliente",
    get_cliente: "SELECT id_clientes,restaurante,nombre,apellido,direccio,telefono FROM cliente WHERE id_clientes = ?",
    post_cliente: "INSTER INTO cliente (restaurante,nombre,apellido,direccio,telefono) VALUES(?,?,?,?,?)",
    update_cliente: "UPDATE cliente SET restaurante = ?,nombre = ?,apellido = ?,direccion = ? telefono = ? WHERE id_clientes = ?",
    delete_cliente: "DELTE FROM cliente WHERE id_clientes",
}
