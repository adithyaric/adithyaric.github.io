---
author: Adithya Ricky
pubDatetime: 2023-10-06T13:19:02Z
title: Tipe Data pada Dart
postSlug: dart-tipe-data
featured: true
draft: false
tags:
  - docs
  - dart
description: Description of the content.
---

# Variable

- Variable merupakan tempat untuk menyimpan data, ada banyak sekali tipe data di Dart
- Variable sangat berguna ketika kita ingin menggunakan data yang sama berkali-kali, dibandingkan kita buat berulang-ulang, lebih baik kita simpan data tersebut dalam variable
- Variable wajib memiliki tipe data dan nama variable, ketika kita akan mengakses variable tersebut, kita cukup menyebutkan nama variable nya

## Untuk membuat deklarasi variable, kita bisa gunakan format :

- TipeData namaVariable;
- Biasanya penamaan variable di Dart menggunakan camelCase, seperti firstName, lastName, thisIsLongVariableName
- Setelah mendeklarasikan variable, kita bisa mengubah isi variable dengan cara : namaVariable = isi value nya

## Deklarasi Langsung

Variable juga bisa dibuat langsung dengan deklarasi nilai nya, ini sangat cocok jika kita ingin membuat variable langsung dengan value dari variable nya
Cara membuatnya kita bisa gunakan perintah : TipeData namaVariable = isi variable;

```dart
// Deklarasi Variable
int umur;
String nama;

// Mengisi Variable
umur = 20;
nama = "Budi";

print("Nama saya adalah $nama dan umur saya adalah $umur tahun.");

// Deklarasi Langsung
double tinggiBadan = 170.5;
bool isMenikah = false;

print("Tinggi badan saya adalah $tinggiBadan cm dan status menikah saya adalah $isMenikah.");
```

## Kata Kunci var

Saat kita membuat variable langsung dengan nilainya, kita bisa menggunakan kata kunci var sebagai pengganti TipeData nya
Ini mirip dengan bahasa pemrograman seperti Java, Go-Lang, Kotlin dan lain-lain
TipeData akan dibaca sesuai dengan isi nilai nya secara otomatis oleh Dart, sehingga kita tidak perlu menyebutkan TipeData nya lagi
Cara menggunakan kata kunci var, seperti ini : var namaVariable = value;

```dart
// Deklarasi Variable dengan var
var alamat;
var gaji;

// Mengisi Variable
alamat = "Jakarta";
gaji = 5000000;

print("Alamat saya adalah $alamat dan gaji saya adalah $gaji per bulan.");

// Deklarasi Langsung dengan var
var beratBadan = 65.7;
var isMerokok = true;

print("Berat badan saya adalah $beratBadan kg dan status merokok saya adalah $isMerokok.");
```

## Kata Kunci final

Secara default, variable di Dart bisa dideklarasikan ulang, artinya jika sebelumnya kita membuat variable name dengan value "Eko", kita bisa ubah variable tersebut menjadi "Joko" dengan cara namaVariable = "Joko"
Kadang ada kasus dimana kita tidak ingin sebuah variable bisa dideklarasikan ulang, untuk melakukan itu kita bisa gunakan kata kunci final :
final TipeData namaVariable = value;
final namaVariable = value;

## Kata Kunci const

Kata kunci final digunakan agar variable tidak bisa dideklarasikan ulang, namun nilai dari variable nya sendiri bisa diubah
Di Dart terdapat kata kunci constant, digunakan untuk menjadikan variable dan nilainya menjadi immutable (tidak bisa diubah sama sekali)
Kata kunci const akan menjadikan data di hardcode pada saat Dart melakukan kompilasi kode program, jadi hati-hati ketika menggunakan kata kunci const
Misal jika kita membuat data waktu saat ini menggunakan final, maka variable waktu akan selalu mengikuti waktu saat ini, namun jika menggunakan const, nilai waktu akan di hardcode ketika kode program di kompilasi, sehingga tidak akan pernah berubah

```dart
// Deklarasi Variable dengan final
final String namaLengkap = "Budi Santoso";
print("Nama lengkap saya adalah $namaLengkap.");

// Deklarasi Variable dengan const
const double pi = 3.14;
print("Nilai Pi adalah $pi.");

// Deklarasi Array dengan final
final List<String> buah = ['apel', 'pisang', 'jeruk'];
print("Array buah: $buah");
// Mengubah elemen Array
buah[0] = 'mangga';
print("Array buah setelah diubah: $buah");

// Deklarasi Array dengan const
const List<int> bilangan = [1, 2, 3, 4, 5];
print("Array bilangan: $bilangan");
```

## Kata Kunci late

Di Dart, secara standar, variable akan dideklarasikan nilainya ketika variable dibuat
Namun kadang ada kasus dimana kita ingin variable dideklarasikan nanti saja, ketika memang variable tersebut diakses, jika tidak diakses, tidak perlu dideklarasikan
Untuk melakukan hal ini, kita bisa tambahkan kata kunci late di awal deklarasi variable

```dart
class ContohLate {
  late String salam;

  ContohLate(String sapaan) {
    salam = sapaan;
  }

  void sapa() {
    print(salam);
  }
}

void main() {
  var contoh = ContohLate('Halo, Dunia!');
  contoh.sapa();
}
```

## Komentar

Komentar adalah kode program yang akan diabaikan ketika kode program di compile atau dijalankan
Biasanya komentar digunakan untuk menambahkan dokumentasi pada kode program
Di Dart, ada banyak jenis komentar
Single-line atau satu baris, bisa menggunakan perintah :

```dart
// silahkan masukkan komentar disini
```

Multi-line atau lebih dari satu baris, bisa menggunakan perintah :

```dart
/*
isi komentar
*/
```

Documentation, ini adalah jenis komentar yang biasanya digunakan sebagai dart documentation :

```dart
/// isi dokumentasi
```

# Number

Number adalah tipe data angka, terdapat dua jenis tipe data Number, int dan double
int adalah tipe data bilangan bulat
double adalah tipe data bilangan desimal
Penulisan koma dalam double menggunakan titik, bukan koma, jadi jika kita akan membuat bilangan desimal 0,5 (nol koma lima), maka ditulis 0.5

### num

Jika kita ingin menggunakan tipe data number yang bisa int ataupun double, kita bisa menggunakan tipe data num

```dart
// Deklarasi Variable dengan tipe data int
int umur = 20;
print("Umur saya adalah $umur tahun.");

// Deklarasi Variable dengan tipe data double
double tinggiBadan = 170.5;
print("Tinggi badan saya adalah $tinggiBadan cm.");

// Deklarasi Variable dengan tipe data num
num beratBadan = 65.7;
print("Berat badan saya adalah $beratBadan kg.");

beratBadan = 66;
print("Berat badan saya sekarang adalah $beratBadan kg.");
```

## Boolean

Boolean adalah tipe data yang hanya memiliki dua nilai, yaitu benar atau salah
Boolean direpresentasikan dengan kata kunci bool
Untuk nilai benar, menggunakan kata kunci true
Untuk nilai salah, menggunakan kata kunci false

```dart
bool finish = false;
print(finish);
finish = true;
print(finish);
```

## String

String merupakan tipe data text atau tulisan
Untuk membuat String, kita bisa menggunakan tanda kutip satu atau kutip dua, lalu di dalamnya berisi nilai text nya
Walaupun String bisa menggunakan kutip dua, tapi disarankan untuk menggunakan kutip satu saja

## String Interpolation

String mendukung expression, dimana di dalam expression kita bisa mengambil data dari variable lain
Untuk membuat expression, kita bisa menggunakan format ${isiExpression}, jika sederhana kita bisa langsung menggunakan $isiExpression

```dart
// Deklarasi Variable dengan tipe data String
String nama = 'Budi';
int umur = 20;
double tinggiBadan = 170.5;

// String Interpolation
String profil = 'Nama saya adalah $nama, umur saya adalah $umur tahun, dan tinggi badan saya adalah $tinggiBadan cm.';
print(profil);

// String Interpolation dengan Expression
int tahunLahir = 2003;
String profilLengkap = 'Nama saya adalah $nama, saya lahir pada tahun $tahunLahir, jadi umur saya sekarang adalah ${DateTime.now().year - tahunLahir} tahun.';
print(profilLengkap);
// Variabel profilLengkap bahkan menggunakan ekspresi dalam String Interpolation untuk menghitung umur berdasarkan tahun lahir.
```
