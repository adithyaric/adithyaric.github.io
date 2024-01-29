---
author: Adithya Ricky
pubDatetime: 2024-01-29T13:44:51Z
title: Membuat REST API dengan Golang dan Gin
postSlug: membuat-rest-api-dengan-golang-dan-gin
featured: true
draft: false
tags:
  - docs
  - golang
  - gin
  - rest-api
description: Postingan ini memberikan tutorial langkah-demi-langkah tentang cara membuat REST API menggunakan Golang dan framework Gin. Setiap bagian memberikan Anda panduan mendetail tentang fungsi dan antarmuka dari API ini.
---

# Membuat REST API dengan Golang dan Gin

Berikut adalah langkah-langkah untuk membuat REST API dengan Golang dan Gin.

## Persiapan

Pertama, kita perlu mengimpor paket yang diperlukan. Kita akan menggunakan net/http untuk permintaan dan respons HTTP, encoding/json untuk mengubah antara JSON dan struktur data Golang, io/ioutil untuk membaca dan menulis file, dan log untuk logging. Kita juga akan menggunakan framework Gin, yang diimpor sebagai github.com/gin-gonic/gin.

```go
package main

import (
    "errors"
    "net/http"
    "encoding/json"
    "io/ioutil"
    "log"
    "github.com/gin-gonic/gin"
)
```

### Mendefinisikan Struktur Data

Kita akan membuat API untuk produk, jadi kita perlu mendefinisikan struktur data untuk produk. Setiap produk memiliki ID, nama, kuantitas, dan harga.

```go
type product struct {
ID string `json:"id"`
Name string `json:"name"`
Quantity int `json:"quantity"`
Price float64 `json:"price"`
}
```

Kita juga mendefinisikan variabel products sebagai slice dari produk.

```go
var products = []product{}
```

```json
///product.json
[
  { "id": "1", "name": "Product A", "quantity": 1, "price": 56.99 },
  { "id": "2", "name": "Product B", "quantity": 3, "price": 17.99 },
  { "id": "3", "name": "Product C", "quantity": 5, "price": 39.99 }
]
```

### Membaca dan Menulis Produk ke JSON

Kita perlu fungsi untuk membaca produk dari file JSON dan menulis produk ke file JSON.

Fungsi loadProducts membaca file product.json, mengubah JSON menjadi slice produk, dan menyimpannya dalam variabel products.

```go
func loadProducts() {
    productsJson, err := ioutil.ReadFile("product.json")
    if err != nil {
        log.Fatalf("Failed to read file: %s", err)
    }
    err = json.Unmarshal(productsJson, &products)
    if err != nil {
        log.Fatalf("JSON unmarshaling failed: %s", err)
    }
}
```

Fungsi saveProductsToJson mengubah slice produk menjadi JSON dan menulisnya ke file product.json.

```go
func saveProductsToJson() {
    productsJson, err := json.Marshal(products)
    if err != nil {
        log.Fatalf("JSON marshaling failed: %s", err)
    }
    err = ioutil.WriteFile("product.json", productsJson, 0644)
    if err != nil {
        log.Fatalf("Failed to write to file: %s", err)
    }
}
```

## Mendefinisikan Fungsi Utama

Fungsi main mendefinisikan rute API dan menjalankan server.

```go
func main() {
    router := gin.Default()
    router.GET("/products", getProducts)
    router.GET("/product/:id", getProductByID)
    router.POST("/product", storeProduct)
    router.PUT("/product", updateProduct)

    router.Run("localhost:8080")
}
```

### Mendefinisikan Fungsi Handler

Kita perlu mendefinisikan fungsi handler untuk setiap rute.

Fungsi getProducts menampilkan semua produk.

```go
func getProducts(c *gin.Context) {
    loadProducts()
    c.IndentedJSON(http.StatusOK, products)
}
```

### Fungsi getProductByID

Menangani permintaan dan respons HTTP untuk mendapatkan produk berdasarkan ID. Berikut adalah langkah-langkah yang dilakukan oleh fungsi ini:

1. Mengambil ID dari parameter URL dengan id := c.Param("id").

2. Memanggil fungsi productByID untuk mendapatkan produk dengan ID yang diberikan. Fungsi ini menampilkan produk dan error (jika ada). Jika produk tidak ditemukan, fungsi ini akan menampilkan error.

3. Jika ada error (produk tidak ditemukan), fungsi ini akan mengirim respons dengan kode status 404 (Not Found) dan pesan dalam body respons, lalu kembali dari fungsi dengan return.

4. Jika produk ditemukan, fungsi ini akan mengirim respons dengan kode status 200 (OK) dan produk dalam body respons.

```go
// getProductByID menangani permintaan dan respons HTTP untuk mendapatkan produk berdasarkan ID.
func getProductByID(c *gin.Context) {
    // Dapatkan ID dari parameter URL.
    id := c.Param("id")

    // Panggil productByID untuk mendapatkan produk dengan ID yang diberikan.
    product, err := productByID(id)

    // Jika ada error (produk tidak ditemukan), kirim respons dengan kode status 404 (Not Found)
    // dan pesan dalam body respons, lalu kembali dari fungsi.
    if err != nil {
        c.IndentedJSON(http.StatusNotFound, gin.H{"message": "product not found."})
        return
    }

    // Jika produk ditemukan, kirim respons dengan kode status 200 (OK) dan produk dalam body respons.
    c.IndentedJSON(http.StatusOK, product)
}
```

### Fungsi productByID

Digunakan untuk mencari produk dengan ID tertentu dalam slice products. Berikut adalah langkah-langkah yang dilakukan oleh fungsi ini:

1. Melakukan iterasi pada slice products.

2. Jika ID produk cocok dengan ID yang diberikan, fungsi akan menampilkan pointer ke produk dan nil untuk error.

3. Jika tidak ada produk yang ditemukan dengan ID yang diberikan, fungsi akan menampilkan nil untuk produk dan error.

```go
// productByID menampilkan pointer ke produk dengan ID yang diberikan, atau error jika produk tidak ditemukan.
func productByID(id string) (*product, error) {
    for i, b := range products {
        if b.ID == id {
            return &products[i], nil
        }
    }
    return nil, errors.New("product not found")
}
```

### Fungsi storeProduct

Digunakan untuk menambahkan produk baru. Berikut adalah langkah-langkah yang dilakukan oleh fungsi ini:

1. Mendeklarasikan variabel newProduct dari tipe product.

2. Memanggil c.BindJSON(&newProduct) untuk mengikat JSON yang diterima ke newProduct. Jika ada error, fungsi akan langsung kembali dengan return.

3. Menambahkan newProduct ke slice products dengan products = append(products, newProduct).

4. Menyimpan products ke JSON dengan memanggil saveProductsToJson().

5. Mengirim respons dengan status kode 201 (Created) dan newProduct dalam body respons.

```go
// storeProduct menambahkan produk baru.
func storeProduct(c *gin.Context) {
    var newProduct product
    if err := c.BindJSON(&newProduct); err != nil {
        return
    }
    products = append(products, newProduct)
    saveProductsToJson()
    c.IndentedJSON(http.StatusCreated, newProduct)
}
```

### Fungsi updateProduct

Digunakan untuk memperbarui produk yang ada. Berikut adalah langkah-langkah yang dilakukan oleh fungsi ini:

1. Mendeklarasikan variabel updatedProduct dari tipe product.

2. Memanggil c.BindJSON(&updatedProduct) untuk mengikat JSON yang diterima ke updatedProduct. Jika ada error, fungsi akan langsung kembali dengan return.

3. Melakukan iterasi pada slice products.

4. Jika ID produk cocok dengan ID updatedProduct, fungsi akan mengganti produk dalam slice dengan updatedProduct.

5. Menyimpan products ke JSON dengan memanggil saveProductsToJson().

6. Mengirim respons dengan status kode 200 (OK) dan updatedProduct dalam body respons.

7. Jika tidak ada produk yang ditemukan dengan ID yang diberikan, fungsi akan mengirim respons dengan status kode 404 (Not Found) dan pesan dalam body respons.

```go
// updateProduct memperbarui produk yang ada dengan data baru yang diterima dalam body permintaan.
func updateProduct(c *gin.Context) {
    // Deklarasikan variabel dari tipe product untuk menampung data produk yang diperbarui.
    var updatedProduct product

    // Panggil BindJSON untuk mengikat JSON yang diterima ke updatedProduct.
    // Jika ada error, kembali dari fungsi.
    if err := c.BindJSON(&updatedProduct); err != nil {
        return
    }

    // Lakukan iterasi pada slice products.
    for i, p := range products {
        // Jika ID produk cocok dengan ID updatedProduct,
        // ganti produk dalam slice dengan updatedProduct.
        if p.ID == updatedProduct.ID {
            products[i] = updatedProduct

            // Simpan slice products yang diperbarui ke JSON.
            saveProductsToJson()

            // Kirim respons dengan kode status 200 (OK) dan updatedProduct dalam body respons.
            c.IndentedJSON(http.StatusOK, updatedProduct)
            return
        }
    }

    // Jika tidak ada produk yang ditemukan dengan ID yang diberikan, kirim respons dengan kode status 404 (Not Found)
    // dan pesan dalam body respons.
    c.IndentedJSON(http.StatusNotFound, gin.H{"message": "product not found"})
}
```
