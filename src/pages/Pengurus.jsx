import React, { Component } from "react";

export class Pengurus extends Component {
  render() {
    const dataPengurus = [
      { nama: "Alim Hardiansyah S.T., M.Kom.", nim: "-", jabatan: "Kepala Lab" },
      { nama: "Ardika Aji Setiawan", nim: "3337220097", jabatan: "Koordinator Umum" },
      { nama: "Setiawan Permana", nim: "3337220095", jabatan: "Wakil Koordinator" },
      { nama: "Mutiara Sandi", nim: "3337220100", jabatan: "AFO" },
      { nama: "Josua Estomihi Pakpahan ", nim: "3337220040", jabatan: "Academia" },
      { nama: "Ripan Laksmana Putra", nim: "3337230037", jabatan: "Public Relation" },
      { nama: "Muhammad Adli Nursah", nim: "3337220059", jabatan: "Public Relation" },
      { nama: "Widi Tri Nurhasanah", nim: "3337220080", jabatan: "MediaOps" },
      { nama: "Azizah Siti Nurafiah", nim: "3337230083", jabatan: "MediaOps" },
      { nama: "Mujadid Akbar Paryono", nim: "3337230089", jabatan: "TechOps" },
      { nama: "Mukhlis Gia tegar", nim: "3337220060", jabatan: "TechOps" },
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
