import React, { Component } from "react";

export class Pengurus extends Component {
  render() {
    const dataPengurus = [
      { nama: "Ripan Laksmana Putra", nim: "22312001", jabatan: "Koordinator Asisten" },
      { nama: "Salsabila Putri", nim: "22312002", jabatan: "Wakil Koordinator" },
      { nama: "Fadli Ramadhan", nim: "22312003", jabatan: "Asisten Jaringan" },
      { nama: "Dewi Lestari", nim: "22312004", jabatan: "Asisten Basis Data" },
      { nama: "Andi Pratama", nim: "22312005", jabatan: "Asisten Pemrograman" },
      { nama: "Nadia Aulia", nim: "22312006", jabatan: "Asisten Multimedia" },
    ];

    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-violet-700">
          Daftar Pengurus Asisten Laboratorium Informatika
        </h1>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-lg shadow-md bg-white">
            <thead className="bg-violet-700 text-dark">
              <tr>
                <th className="py-3 px-4 text-left">No</th>
                <th className="py-3 px-4 text-left">Nama</th>
                <th className="py-3 px-4 text-left">NIM</th>
                <th className="py-3 px-4 text-left">Jabatan</th>
              </tr>
            </thead>
            <tbody>
              {dataPengurus.map((item, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-violet-50 transition`}
                >
                  <td className="py-3 px-4 text-black">{index + 1}</td>
                  <td className="py-3 px-4 font-medium text-black">{item.nama}</td>
                  <td className="py-3 px-4 text-black">{item.nim}</td>
                  <td className="py-3 px-4 text-black">{item.jabatan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Pengurus;
