import React, { useState, useEffect } from "react";
import ManagementMenu from "../../components/ManagementMenu";
import HamburgerMenu from "../../components/HamburgerMenu";
import ServiceDialog from "../../components/ServiceDialog";

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/services");
      if (res.ok) {
        const data = await<edit_file>
<path>admin/pages/home/service-packages.js</path>
<content>
<<<<<<< SEARCH
import React, { useState, useEffect } from "react";
import ServiceDialog from "../../components/ServiceDialog";

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/services");
      if (res.ok) {
        const data = await res.json();
        setServices(data);
      } else {
        console.error("Failed to fetch services");
      }
    } catch (error) {
