"use client";

import { useFormStatus } from "react-dom";
import { deleteProduct } from "../actions/products";


export function DeleteForm({ id }: { id: string }) {

  return (
    <form action={deleteProduct}>
      <input type="hidden" name="id" value={id} />
      <button type="submit">Delete</button>
    </form>
  );
}