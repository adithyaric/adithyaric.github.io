---
author: Adithya Ricky
pubDatetime: 2024-02-04T13:00:00Z
title: Pemrograman Go Dasar
postSlug: pemrograman-go-dasar
featured: true
draft: false
tags:
  - docs
  - golang
description: Pada bagian ini topik yang dibahas sangat dasar, cocok untuk orang yang belum pernah tau atau belum menggunakan bahasa Go. Pembahasan dimulai dari instalasi, eksekusi, hello word, dilanjutkan dengan topik seperti pembahasan beberapa keyword Go, pointer, struct, interface, reflect, goroutine, channel, date time, dan lainnya.
---

# A.1. Belajar Golang

**[Golang](https://golang.org/)** (atau biasa disebut dengan **Go**) adalah bahasa pemrograman yang dikembangkan di **Google** oleh **[Robert Griesemer](https://github.com/griesemer)**, **[Rob Pike](https://en.wikipedia.org/wiki/Rob_Pike)**, dan **[Ken Thompson](https://en.wikipedia.org/wiki/Ken_Thompson)** pada tahun 2007 dan mulai diperkenalkan ke publik tahun 2009.

Penciptaan bahasa Go didasari bahasa **C** dan **C++**, oleh karena itu gaya sintaksnya mirip.

#### Kelebihan Go

Go memiliki kelebihan dibanding bahasa lainnya, beberapa di antaranya:

- Mendukung konkurensi di level bahasa dengan pengaplikasian cukup mudah
- Mendukung pemrosesan data dengan banyak prosesor dalam waktu yang bersamaan _(pararel processing)_
- Memiliki _garbage collector_
- Proses kompilasi sangat cepat
- Bukan bahasa pemrograman yang hirarkial dan bukan _strict_ OOP, memberikan kebebasan ke developer perihal bagaimana cara penulisan kode.
- Dependensi dan _tooling_ yang disediakan terbilang lengkap.
- Dukungan komunitas sangat bagus. Banyak tools yang tersedia secara gratis dan _open source_ yang bisa langsung dimanfaatkan.

Sudah banyak industri dan perusahaan yg menggunakan Go sampai level production, termasuk di antaranya adalah Google sendiri, dan juga tempat di mana penulis bekerja 😁

---

Pada buku ini (terutama semua serial chapter A) kita akan belajar tentang dasar pemrograman Go, mulai dari 0, dan gratis.

![The Go Logo](/assets/images/A_introduction_1_logo.png)

# A.2. Instalasi Golang (Stable & Unstable)

Hal pertama yang perlu dilakukan sebelum bisa menggunakan Go adalah meng-_install_-nya terlebih dahulu. Panduan instalasi sebenarnya sudah disediakan di situs resmi Go [http://golang.org/doc/install#install](http://golang.org/doc/install#install).

Di sini penulis mencoba meringkas petunjuk instalasi pada _link_ di atas, agar lebih mudah untuk diikuti terutama untuk pembaca yang baru belajar.

> Go yang digunakan adalah versi **1.20**, direkomendasikan menggunakan versi tersebut.

URL untuk mengunduh _installer_ Go: https://golang.org/dl/. Silakan langsung unduh dari _link_ tersebut lalu lakukan proses instalasi, atau bisa mengikuti petunjuk pada chapter ini.

## A.2.1. Instalasi Go _Stable_

#### • Instalasi Go di Windows

1.  Download terlebih dahulu _installer_-nya di [https://golang.org/dl/](https://golang.org/dl/). Pilih _installer_ untuk sistem operasi Windows sesuai jenis bit yang digunakan.

2.  Setelah ter-_download_, jalankan _installer_, klik _next_ hingga proses instalasi selesai. _By default_ jika anda tidak merubah path pada saat instalasi, Go akan ter-_install_ di `C:\go`. _Path_ tersebut secara otomatis akan didaftarkan dalam `PATH` _environment variable_.

3.  Buka _Command Prompt_ / _CMD_, eksekusi perintah berikut untuk mengecek versi Go.

    ```bash
    go version
    ```

4.  Jika output adalah sama dengan versi Go yang ter-_install_, menandakan proses instalasi berhasil.

> Sering terjadi, command `go version` tidak bisa dijalankan meskipun instalasi sukses. Solusinya bisa dengan restart CMD (tutup CMD, kemudian buka lagi). Setelah itu coba jalankan ulang command di atas.

#### • Instalasi Go di MacOS

Cara termudah instalasi Go di MacOS adalah menggunakan [Homebrew](http://brew.sh/).

1.  _Install_ terlebih dahulu Homebrew (jika belum ada), caranya jalankan perintah berikut di **terminal**.

    ```bash
    $ ruby -e "$(curl -fsSL http://git.io/pVOl)"
    ```

2.  _Install_ Go menggunakan command `brew`.

    ```bash
    $ brew install go
    ```

3.  Tambahkan path binary Go ke `PATH` _environment variable_.

    ```bash
    $ echo "export PATH=$PATH:/usr/local/go/bin" >> ~/.bash_profile
    $ source ~/.bash_profile
    ```

4.  Jalankan perintah berikut mengecek versi Go.

    ```bash
    go version
    ```

5.  Jika output adalah sama dengan versi Go yang ter-_install_, menandakan proses instalasi berhasil.

#### • Instalasi Go di Linux

1.  Unduh arsip _installer_ dari [https://golang.org/dl/](https://golang.org/dl/), pilih installer untuk Linux yang sesuai dengan jenis bit komputer anda. Proses download bisa dilakukan lewat CLI, menggunakan `wget` atau `curl`.

    ```bash
    $ wget https://storage.googleapis.com/golang/go1...
    ```

2.  Buka terminal, _extract_ arsip tersebut ke `/usr/local`.

    ```bash
    $ tar -C /usr/local -xzf go1...
    ```

3.  Tambahkan path binary Go ke `PATH` _environment variable_.

    ```bash
    $ echo "export PATH=$PATH:/usr/local/go/bin" >> ~/.bashrc
    $ source ~/.bashrc
    ```

4.  Selanjutnya, eksekusi perintah berikut untuk mengetes apakah Go sudah terinstal dengan benar.

    ```bash
    go version
    ```

5.  Jika output adalah sama dengan versi Go yang ter-_install_, menandakan proses instalasi berhasil.

## A.2.2. Variabel `GOROOT`

_By default_, setelah proses instalasi Go selesai, secara otomatis akan muncul _environment variable_ `GOROOT`. Isi dari variabel ini adalah lokasi di mana Go ter-_install_.

Sebagai contoh di Windows, ketika Go di-_install_ di `C:\go`, maka path tersebut akan menjadi isi dari `GOROOT`.

Silakan gunakan command `go env` untuk melihat informasi konfigurasi _environment_ yang ada.

## A.2.3. Instalasi Go _Unstable_/_Development_

Jika pembaca tertarik untuk mencoba versi development Go, ingin mencoba fitur yang belum dirilis secara official, ada beberapa cara:

- Instalasi dengan _build from source_ https://go.dev/doc/install/source
- Gunakan command `go install`, contohnya seperti `go install golang.org/dl/go1.18beta1@latest`. Untuk melihat versi unstable yang bisa di-install silakan merujuk ke https://go.dev/dl/#unstable

# A.3. Go Modules

Pada bagian ini kita akan belajar cara inisialisasi project menggunakan Go Modules (atau Modules).

## A.3.1. Penjelasan

Go modules merupakan manajemen dependensi resmi untuk Go. Modules ini diperkenalkan pertama kali di `go1.11`, sebelum itu pengembangan project Go dilakukan dalam `GOPATH`.

Modules digunakan untuk menginisialisasi sebuah project, sekaligus melakukan manajemen terhadap _3rd party_ atau _library_ lain yang dipergunakan.

Modules penggunaannya adalah lewat CLI. Dan jika temen-temen sudah sukses meng-_install_ Go, maka otomatis bisa mempergunakan Go Modules.

> Modules atau Module di sini merupakan istilah untuk project ya. Jadi jangan bingung.

## A.3.2. Inisialisasi Project Menggunakan Go Modules

Command `go mod init` digunakan untuk menginisialisasi project baru.

Mari kita praktekan, buat folder baru, bisa via CLI atau lewat browser/finder.

```bash
mkdir project-pertama
cd project-pertama
go mod init project-pertama
dir
```

Bisa dilihat pada _command_ di atas ada direktori `project-pertama`, dibuat. Setelah masuk ke direktori tersebut, perintah `go mod init project-pertama` dijalankan. Dengan ini maka kita telah menginisialisasi direktori `project-pertama` sebagai sebuah project Go dengan nama `project-pertama` (kebetulan di sini nama project sama dengan nama direktori-nya).

![Init project](/assets/images/A_go_modules_1_initmodule.png)

Skema penulisan command `go mod`:

```
go mod init <nama-project>
go mod init project-pertama
```

Untuk nama project, umumnya adalah disamakan dengan nama direktori, tapi bisa saja sebenarnya menggunakan nama yang lain.

> Nama project dan Nama module merupakan istilah yang sama.

Eksekusi perintah `go mod init` menghasilkan satu buah file baru bernama `go.mod`. File ini digunakan oleh Go toolchain untuk menandai bahwa folder di mana file tersebut berada adalah folder project. Jadi jangan di hapus ya file tersebut.

---

Ok, sekian. Cukup itu saja cara inisialisasi project di Go.

O iya, sebenarnya selain Go Modules, setup project di Go juga bisa menggunakan `$GOPATH` A.4. Setup GOPATH Dan Workspace. Tapi inisialisasi project dengan GOPATH sudah outdate dan kurang dianjurkan untuk project-project yang dikembangkan menggunakan Go versi terbaru (1.14 ke atas). Jadi setelah chapter ini, bisa langsung lanjut ke A.5. Instalasi Editor.

# A.4. GOPATH Dan Workspace

> PERINGATAN! Setup Go project menggunakan GOPATH kurang dianjurkan untuk Go versi terbaru. Lebih baik gunakan [A.3. Setup Go Modules](/A-setup-go-project-dengan-go-modules.html). Tapi meski demikian, bukan berarti GOPATH tidak berguna sama sekali, jadi silakan ikuti panduan berikut jika mau.

## A.4.1. Variabel `GOPATH`

**GOPATH** adalah variabel yang digunakan oleh Go sebagai rujukan lokasi di mana semua folder project disimpan, kecuali untuk yg diinisialisasi menggunakan Go Modules. GOPATH berisikan 3 buah sub-folder: `src`, `bin`, dan `pkg`.

Project di Go bisa ditempatkan dalam `$GOPATH/src`. Sebagai contoh anda ingin membuat project dengan nama `belajar`, maka **harus** dibuatkan sebuah folder dengan nama `belajar`, ditempatkan dalam `src` (`$GOPATH/src/belajar`).

> Path separator yang digunakan sebagai contoh di buku ini adalah slash `/`. Khusus pengguna Windows, path separator adalah backslash `\`.

## A.4.2. Setup Workspace

Lokasi folder yang akan dijadikan sebagai workspace bisa ditentukan sendiri. Anda bisa menggunakan alamat folder mana saja, bebas, tapi jangan gunakan path tempat di mana Go ter-_install_ (tidak boleh sama dengan `GOROOT`). Lokasi tersebut harus didaftarkan dalam path variable dengan nama `GOPATH`. Sebagai contoh, penulis memilih path `$HOME/Documents/go`, maka saya daftarkan alamat tersebut. Caranya:

- Bagi pengguna **Windows**, tambahkan path folder tersebut ke **path variable** dengan nama `GOPATH`. Setelah variabel terdaftar, cek apakah path sudah terdaftar dengan benar.

  > Sering terjadi `GOPATH` tidak dikenali meskipun variabel sudah didaftarkan. Jika hal seperti ini terjadi, restart CMD, lalu coba lagi.

- Bagi pengguna Mac OS, export path ke `~/.bash_profile`. Untuk Linux, export ke `~/.bashrc`

  ```bash
  $ echo "export GOPATH=$HOME/Documents/go" >> ~/.bash_profile
  $ source ~/.bash_profile
  ```

  Cek apakah path sudah terdaftar dengan benar.

  ![Pengecekan `GOPATH` di sistem operasi non-Windows](/assets/images/A_gopath_workspace_1_path.png)

Setelah `GOPATH` berhasil dikenali, perlu disiapkan 3 buah sub folder di dalamnya, dengan kriteria sebagai berikut:

- Folder `src`, adalah path di mana project Go disimpan
- Folder `pkg`, berisi file hasil kompilasi
- Folder `bin`, berisi file executable hasil build

![Struktur folder dalam worskpace](/assets/images/A_gopath_workspace_2_workspace.png)

Struktur di atas merupakan struktur standar workspace Go. Jadi pastikan penamaan dan hirarki folder adalah sama.

# A.5. Instalasi Editor

Proses pembuatan aplikasi menggunakan Go akan lebih maksimal jika didukung oleh editor atau **IDE** yang pas. Ada cukup banyak pilihan bagus yang bisa dipertimbangkan, di antaranya: Brackets, JetBrains GoLand, Netbeans, Atom, Visual Studio Code, Sublime Text, dan lainnya.

Penulis sarankan untuk memilih editor yang paling nyaman digunakan, preferensi masing-masing pastinya berbeda. Penulis sendiri lebih sering menggunakan **Visual Studio Code**. Editor ini sangat ringan, mudah didapat, dan memiliki ekstensi yang bagus untuk bahasa Go. Jika pembaca ingin menggunakan editor yang sama, maka silakan melanjutkan panduan berikut.

Pada chapter ini akan dijelaskan bagaimana cara instalasi editor Visual Studio Code.

## A.5.1. Instalasi Editor Visual Studio Code

1.  Download Visual Studio Code di [https://code.visualstudio.com/Download](https://code.visualstudio.com/Download), pilih sesuai dengan sistem operasi yang digunakan.
2.  Jalankan _installer_.
3.  Setelah selesai, jalankan editornya.

![Tampilan Visual Studio Code](/assets/images/A_instalasi_editor_1_visual_studio_code.png)

## A.5.2. Instalasi Extensi Go

Dengan meng-_install_ Go Extension pada VSCode, maka development akan menjadi lebih menyenangkan dan mudah. Banyak benefit yang didapat dari ekstensi ini, beberapa di antaranya adalah integrasi dengan kompiler Go, auto lint on save, testing with coverage, fasilitas debugging with breakpoints, dan lainnya.

Cara instalasi ekstensi sendiri cukup mudah, klik `View -> Extension` atau klik ikon _Extension Marketplace_ di sebelah kiri (silakan lihat gambar berikut, deretan button paling kiri yang dilingkari merah). Setelah itu ketikan **Go** pada inputan search, silakan install ekstensi Go buatan GO Team at Google, biasanya muncul paling atas sendiri.

![VSCode Go extension](/assets/images/A_instalasi_editor_2_vscode_go_extension.png)

## A.5.3. Setup Editorconfig

[Editorconfig](https://editorconfig.org/) membantu kita supaya _coding style_ menjadi konsisten untuk dibaca oleh banyak developer, dan juga ketika dimuat pada berbagai macam **IDE**. Instalasinya di VSCode cukup mudah, cari saja _extension_-nya kemudian klik _install_ seperti pada gambar berikut.

![VSCode Editorconfig extension](/assets/images/A_instalasi_editor_3_vscode_editorconfig_extension.png)

Editorconfig pada sebuah proyek (biasanya berada di root direktori proyek tersebut) berupa konfigurasi format file `.editorconfig` yang berisi definisi style penulisan yang menyesuaikan dengan standar penulisan masing-masing bahasa pemrograman. Misalnya untuk [_style guide_ **GO**](https://golang.org/doc/effective_go.html) kita bisa mulai dengan menggunakan konfigurasi sederhana sebagai berikut:

```
root = true

[*]
insert_final_newline = true
charset = utf-8
trim_trailing_whitespace = true
indent_style = space
indent_size = 2

[{Makefile,go.mod,go.sum,*.go}]
indent_style = tab
indent_size = 8
```

# A.6. Command

Pengembangan aplikasi Go tak jauh dari hal-hal yang berbau CLI atau _Command Line Interface_. Proses inisialisasi project, kompilasi, testing, eksekusi program, semuanya dilakukan lewat command line.

Go menyediakan command `go`, dan pada chapter ini kita akan mempelajari beberapa di antaranya.

> Pada pembelajaran chapter ini, pembaca tidak harus praktek, cukup pelajari saja untuk tahu. Mengenai praktek sendiri akan dimulai pada chapter selanjutnya, yaitu [A.7. Program Pertama: Hello World](/A-hello-world.html).

## A.6.1. Command `go mod init`

_Command_ `go mod init` digunakan untuk inisialisasi project pada Go (menggunakan Go Modules). Untuk nama project bisa menggunakan apapun, tapi umumnya adalah disamakan dengan nama direktori.

Nama project ini penting karena nantinya berpengaruh pada _import path sub packages_ yang ada dalam project tersebut.

```
mkdir <nama-project>
cd <nama-project>
go mod init <nama-project>
```

## A.6.2. Command `go run`

_Command_ `go run` digunakan untuk eksekusi file program (file ber-ekstensi `.go`). Cara penggunaannya dengan menuliskan _command_ tersebut diikuti argumen nama file.

Berikut adalah contoh penerapan `go run` untuk eksekusi file program `main.go` yang tersimpan di path `project-pertama` yang path tersebut sudah diinisialisasi menggunakan `go mod init`.

```bash
cd project-pertama
go run main.go
```

![Eksekusi file program menggunakan `go run`](/assets/images/A_go_command_1_go_run.png)

_Command_ `go run` hanya bisa digunakan pada file yang nama package-nya adalah `main`. Lebih jelasnya dibahas pada chapter selanjutnya ([A.7. Program Pertama: Hello World](/A-hello-world.html)).

Jika ada banyak file yang package-nya `main` dan file-file tersebut berada pada satu direktori level dengan file utama, maka eksekusinya adalah dengan menuliskan semua file sebagai argument _command_ `go run`. Contohnya bisa dilihat pada kode berikut.

```bash
go run main.go library.go
```

> Lebih jelasnya perihal argument dan flag akan dibahas pada chapter [A.48. Arguments & Flag](/A-command-line-args-flag.html))

## A.6.3. Command `go test`

Go menyediakan package `testing`, berguna untuk keperluan unit test. File yang akan di-test harus memiliki akhiran `_test.go`.

Berikut adalah contoh penggunaan _command_ `go test` untuk testing file `main_test.go`.

```bash
go test main_test.go
```

![Unit testing menggunakan `go test`](/assets/images/A_go_command_3_go_test.png)

## A.6.4. Command `go build`

_Command_ ini digunakan untuk mengkompilasi file program.

Sebenarnya ketika eksekusi program menggunakan `go run`, terjadi proses kompilasi juga. File hasil kompilasi akan disimpan pada folder temporary untuk selanjutnya langsung dieksekusi.

Berbeda dengan `go build`, _command_ ini menghasilkan file _executable_ atau _binary_ pada folder yang sedang aktif. Contohnya bisa dilihat pada kode berikut.

![Kompilasi file program menghasilkan file executable](/assets/images/A_go_command_4_go_build.png)

Pada contoh di atas, project `project-pertama` di-build, menghasilkan file baru pada folder yang sama, yaitu `project-pertama.exe`, yang kemudian dieksekusi. _Default_-nya nama project akan otomatis dijadikan nama _binary_.

Untuk nama executable sendiri bisa diubah menggunakan flag `-o`. Contoh:

```
go build -o <nama-executable>
go build -o program.exe
```

> Untuk sistem operasi non-windows, tidak perlu menambahkan akhiran `.exe` pada nama _binary_

## A.6.5. Command `go get`

_Command_ `go get` digunakan untuk men-download package. Sebagai contoh saya ingin men-download package Kafka driver untuk Go pada project `project-pertama`.

```bash
cd project-pertama
go get github.com/segmentio/kafka-go
dir
```

![Download package menggunakan `go get`](/assets/images/A_go_command_6_go_get.png)

Pada contoh di atas, `github.com/segmentio/kafka-go` adalah URL package kafka-go. Package yang sudah terunduh tersimpan dalam temporary folder yang ter-link dengan project folder di mana _command_ `go get` dieksekusi, menjadikan project tersebut bisa meng-_import_ package terunduh.

Untuk mengunduh dependensi versi terbaru, gunakan flag `-u` pada command `go get`, misalnya:

```
go get -u github.com/segmentio/kafka-go
```

Command `go get` **harus dijalankan dalam folder project**. Jika dijalankan di-luar project maka akan diunduh ke pada GOPATH.

## A.6.6. Command `go mod tidy`

_Command_ `go mod tidy` digunakan untuk memvalidasi dependensi. Jika ada dependensi yang belum ter-download, maka akan otomatis di-download.

## A.6.7. Command `go mod vendor`

Command ini digunakan untuk vendoring. Lebih detailnya akan dibahas di akhir serial chapter A, pada chapter A.61. Go Vendoring.

# A.7. Program Pertama: Hello World

Semua persiapan sudah selesai, saatnya masuk pada sesi programming. Program pertama yang akan kita buat adalah aplikasi kecil yang menampilkan text **Hello world**.

Pada chapter ini akan dijelaskan secara komprehensif *step-by-step* mulai dari awal. Mulai dari pembuatan project, pembuatan file program, sesi penulisan kode (coding), hingga eksekusi program.

## A.7.1. Inisialisasi Project

Buat direktori bernama `hello-world` bebas ditempatkan di mana. Lalu via CLI, masuk ke direktori tersebut dan jalankan *command* untuk inisialisasi project.

```
mkdir hello-world
cd hello-world
go mod init hello-world
```

![Inisialisasi project](/assets/images/A_hello_world_1_init_project.png)

## A.7.2. Load Project Folder ke Editor

Buka editor, di sini penulis menggunakan VSCode. Cari menu untuk menambahkan project, lalu pilih project folder `hello-world`. Untuk beberapa jenis editor, cara load project bisa cukup dengan klik-drag folder tersebut ke editor.

![Load project folder ke editor](/assets/images/A_hello_world_2_load_project_to_editor.png)

## A.7.3. Menyiapkan File Program

File program di sini maksudnya adalah file yang isinya *source code* Go. File ini berekstensi `.go`.

Di dalam project yang telah dibuat, siapkan sebuah file dengan nama bebas, yang jelas harus ber-ekstensi `.go`. Pada contoh ini saya menggunakan nama file `main.go`.

Pembuatan file program bisa dilakukan lewat CLI atau browser, atau juga lewat editor. Pastikan file dibuat dalam project folder ya.

![File program](/assets/images/A_hello_world_3_new_file_on_editor.png)

## A.7.4. Program Pertama: Hello Word

Setelah project folder dan file program sudah siap, saatnya untuk *programming*.

Di bawah ini merupakan contoh kode program sederhana untuk memunculkan text **Hello world** ke layar output command prompt. Silakan salin kode berikut ke file program yang telah dibuat. Sebisa mungkin jangan copy paste. Biasakan untuk menulis dari awal, agar cepat terbiasa dan familiar dengan Go.

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello world")
}
```

Setelah kode disalin, buka terminal (atau CMD bagi pengguna Windows), lalu masuk ke direktori proyek, kemudian jalankan program menggunakan perintah `go run`.

```bash
cd hello-world
go run main.go
```

Hasilnya, muncul tulisan **hello world** di layar console.

![Menjalankan program](/assets/images/A_hello_world_4_execute_hello_world.png)

Selamat! Anda telah berhasil membuat program Go!

---

Berikut merupakan pembahasan untuk tiap baris kode yang sudah ditulis di atas.

## A.7.5. Penggunaan Keyword `package`

Setiap file program harus memiliki **package**. Setiap project harus ada minimal satu file dengan nama *package* `main`. File yang ber-*package* `main`, akan dieksekusi pertama kali ketika program di jalankan.

Cara menentukan *package* dengan menggunakan keyword `package`, berikut adalah contoh penulisannya.

```go
package <nama-package>
package main
```

## A.7.6. Penggunaan Keyword `import`

Keyword `import` digunakan untuk meng-*import* atau memasukan *package* lain ke dalam file program, agar isi dari package yang di-*import* bisa dimanfaatkan.

*Package* `fmt` merupakan salah satu *package* bawaan yang disediakan oleh Go, isinya banyak fungsi untuk keperluan **I/O** yang berhubungan dengan text.

Berikut adalah skema penulisan keyword `import`:

```go
import "<nama-package>"
import "fmt"
```

## A.7.7. Penggunaan Fungsi `main()`

Dalam sebuah proyek harus ada file program yang di dalamnya berisi sebuah fungsi bernama `main()`. Fungsi tersebut harus berada di file yang package-nya bernama `main`.

Fungsi `main()` adalah yang dipanggil pertama kali pada saat eksekusi program. Contoh penulisan fungsi `main`:

```go
func main() {

}
```

## A.7.8. Penggunaan Fungsi `fmt.Println()`

Fungsi `fmt.Println()` digunakan untuk memunculkan text ke layar (pada konteks ini, terminal atau CMD). Di program pertama yang telah kita buat, fungsi ini memunculkan tulisan **Hello world**.

Skema penulisan keyword `fmt.Println()` bisa dilihat pada contoh berikut.

```go
fmt.Println("<isi-pesan>")
fmt.Println("Hello world")
```

Fungsi `fmt.Println()` berada dalam package `fmt`, maka untuk menggunakannya perlu package tersebut untuk di-import terlebih dahulu.

Fungsi `fmt.Println()` dapat menampung parameter yang tidak terbatas jumlahnya. Semua data parameter akan dimunculkan dengan pemisah tanda spasi.

```go
fmt.Println("Hello", "world!", "how", "are", "you")
```

Contoh statement di atas akan menghasilkan output: **Hello world! how are you**.

---
