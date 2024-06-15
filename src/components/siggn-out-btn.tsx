"use client";
import React from "react";
import { Button } from "./ui/button";
import { logOut } from "@/actions/userActions";

export default function SignOutBtn() {
  return <Button onClick={() => logOut()}>Logout</Button>;
}
