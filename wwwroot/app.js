const apiUrl = '/api/products';

document.addEventListener("DOMContentLoaded", loadProducts);

// Guardar producto (nuevo o editar)
document.getElementById("productForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    let id = document.getElementById("productId").value;
    const nombre = document.getElementById("nombre").value.trim();
    const description = document.getElementById("descripcion").value.trim();
    const precio = parseFloat(document.getElementById("precio").value);

    if (!nombre || precio <= 0) {
        alert("Nombre y precio válido requerido.");
        return;
    }

    id = id != "" ? id : 0;

    const producto = { id, nombre, description, precio };
    const url = id ? `${apiUrl}/${id}` : apiUrl;
    const method = id ? "PUT" : "POST";

    const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto)
    });

    if (res.ok) {
        document.getElementById("productForm").reset();
        loadProducts();
    } else {
        const err = await res.text();
        alert("Error: " + err);
    }
});

// Cargar lista de productos
async function loadProducts() {
    const res = await fetch(apiUrl);
    const productos = await res.json();
    const tbody = document.getElementById("productTable");
    tbody.innerHTML = "";

    productos.forEach(p => {
        tbody.innerHTML += `
      <tr>
        <td>${p.nombre}</td>
        <td>${p.description || ""}</td>
        <td>$${p.precio.toFixed(2)}</td>
        <td>${new Date(p.fechaCreacion).toLocaleString()}</td>
        <td>
          <button class="btn btn-sm btn-warning" onclick='editProduct(${p.id})'>Editar</button>
          <button class="btn btn-sm btn-danger" onclick='deleteProduct(${p.id})'>Eliminar</button>
        </td>
      </tr>`;
    });
}

// Editar producto (cargar en el formulario)
async function editProduct(id) {
    const res = await fetch(apiUrl + '/' + id);
    const p = await res.json();
    document.getElementById("productId").value = p.id;
    document.getElementById("nombre").value = p.nombre;
    document.getElementById("descripcion").value = p.description || "";
    document.getElementById("precio").value = p.precio;
}

// Eliminar producto
async function deleteProduct(id) {
    if (!confirm("¿Seguro que deseas eliminar este producto?")) return;

    const res = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    if (res.ok) loadProducts();
    else alert("No se pudo eliminar.");
}