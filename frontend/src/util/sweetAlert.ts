import Swal from "sweetalert2";
import { deletePlayer } from "./api";

export default async function deleteItemAlert(id: number) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deletePlayer(id);
        Swal.fire({
          title: "Deleted!",
          icon: "success",
          showCancelButton: true,
        });
      }
    });
  }

export function updateItemAlert() {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Sucesso",
    text: "Jogador atualizado com sucesso",
    showConfirmButton: false,
    timer: 1500
  });
}

export function saveItemAlert() {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Sucesso",
    text: "Jogador cadastrado com sucesso",
    showConfirmButton: false,
    timer: 1500
  });
  setTimeout(() => {
    window.location.reload();
  }, 2000)
  
}

export function errorAlert() {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Todos os campos precisam estar preenchidos!"
  });
}