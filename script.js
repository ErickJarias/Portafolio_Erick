// Variables globales
let messages = JSON.parse(localStorage.getItem("contactMessages")) || []

// Inicialización cuando se carga la página
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
})

// Función principal de inicialización
function initializeApp() {
  setupNavigation()
  setupContactForm()
  setupScrollAnimations()
  loadMessages()
}

// Configuración de navegación
function setupNavigation() {
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")
  const navLinks = document.querySelectorAll(".nav-link")

  // Toggle del menú hamburguesa
  if (hamburger) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navMenu.classList.toggle("active")
    })
  }

  // Cerrar menú al hacer click en un enlace
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
    })
  })

  // Smooth scrolling para enlaces internos
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const targetId = link.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  // Cambiar estilo de navbar al hacer scroll
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar")
    if (window.scrollY > 100) {
      navbar.style.background = "rgba(10, 10, 10, 0.98)"
    } else {
      navbar.style.background = "rgba(10, 10, 10, 0.95)"
    }
  })
}

// Configuración del formulario de contacto
function setupContactForm() {
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmit)
  }
}

// Manejar envío del formulario
function handleFormSubmit(e) {
  e.preventDefault()

  const formData = new FormData(e.target)
  const messageData = {
    id: Date.now(),
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    date: new Date().toLocaleString("es-ES"),
    timestamp: Date.now(),
  }

  // Validar datos
  if (!validateFormData(messageData)) {
    showNotification("Por favor, completa todos los campos correctamente.", "error")
    return
  }

  // Guardar mensaje
  saveMessage(messageData)

  // Limpiar formulario
  e.target.reset()

  // Mostrar confirmación
  showNotification("¡Mensaje enviado correctamente! Te responderé pronto.", "success")

  // Actualizar panel de admin si está visible
  if (document.getElementById("adminPanel").style.display !== "none") {
    loadMessages()
  }
}

// Validar datos del formulario
function validateFormData(data) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  return (
    data.name.trim().length >= 2 &&
    emailRegex.test(data.email) &&
    data.subject.trim().length >= 3 &&
    data.message.trim().length >= 10
  )
}

// Guardar mensaje en localStorage
function saveMessage(messageData) {
  messages.unshift(messageData) // Agregar al inicio del array
  localStorage.setItem("contactMessages", JSON.stringify(messages))
}

// Cargar mensajes en el panel de administración
function loadMessages() {
  const messagesContainer = document.getElementById("messagesContainer")

  if (!messagesContainer) return

  if (messages.length === 0) {
    messagesContainer.innerHTML = `
            <div class="no-messages">
                <p style="text-align: center; color: var(--text-muted); padding: 2rem;">
                    No hay mensajes aún.
                </p>
            </div>
        `
    return
  }

  messagesContainer.innerHTML = messages
    .map(
      (message) => `
        <div class="message-card" data-id="${message.id}">
            <div class="message-header">
                <div class="message-info">
                    <div class="message-name">${escapeHtml(message.name)}</div>
                    <div class="message-email">${escapeHtml(message.email)}</div>
                    <div class="message-date">${message.date}</div>
                </div>
                <button class="delete-message" onclick="deleteMessage(${message.id})">
                    <i class="fas fa-trash"></i> Eliminar
                </button>
            </div>
            <div class="message-subject">
                <strong>Asunto:</strong> ${escapeHtml(message.subject)}
            </div>
            <div class="message-content">
                ${escapeHtml(message.message).replace(/\n/g, "<br>")}
            </div>
        </div>
    `,
    )
    .join("")
}

// Eliminar mensaje específico
function deleteMessage(messageId) {
  if (confirm("¿Estás seguro de que quieres eliminar este mensaje?")) {
    messages = messages.filter((message) => message.id !== messageId)
    localStorage.setItem("contactMessages", JSON.stringify(messages))
    loadMessages()
    showNotification("Mensaje eliminado correctamente.", "success")
  }
}

// Limpiar todos los mensajes
function clearAllMessages() {
  if (confirm("¿Estás seguro de que quieres eliminar TODOS los mensajes? Esta acción no se puede deshacer.")) {
    messages = []
    localStorage.removeItem("contactMessages")
    loadMessages()
    showNotification("Todos los mensajes han sido eliminados.", "success")
  }
}

// Mostrar acceso al panel de administración
function showAdminAccess() {
  const password = prompt("Ingresa la contraseña de administrador:")

  // Contraseña simple para demo (en producción usar autenticación real)
  if (password === "admin123") {
    toggleAdminPanel()
  } else if (password !== null) {
    showNotification("Contraseña incorrecta.", "error")
  }
}

// Toggle del panel de administración
function toggleAdminPanel() {
  const adminPanel = document.getElementById("adminPanel")

  if (adminPanel.style.display === "none" || !adminPanel.style.display) {
    adminPanel.style.display = "block"
    loadMessages()
    // Scroll al panel
    adminPanel.scrollIntoView({ behavior: "smooth" })
  } else {
    adminPanel.style.display = "none"
  }
}

// Mostrar notificaciones
function showNotification(message, type = "info") {
  // Crear elemento de notificación
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === "success" ? "check-circle" : type === "error" ? "exclamation-circle" : "info-circle"}"></i>
            <span>${message}</span>
        </div>
    `

  // Estilos de la notificación
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#3b82f6"};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
    `

  // Agregar al DOM
  document.body.appendChild(notification)

  // Animar entrada
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Remover después de 5 segundos
  setTimeout(() => {
    notification.style.transform = "translateX(400px)"
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 300)
  }, 5000)
}

// Configurar animaciones de scroll
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up")
      }
    })
  }, observerOptions)

  // Observar elementos para animación
  const animatedElements = document.querySelectorAll(".project-card, .skill-item, .timeline-item, .stat-item")
  animatedElements.forEach((el) => observer.observe(el))
}

// Función para escapar HTML (prevenir XSS)
function escapeHtml(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}

// Funciones de utilidad para estadísticas
function getMessageStats() {
  const today = new Date()
  const thisMonth = messages.filter((msg) => {
    const msgDate = new Date(msg.timestamp)
    return msgDate.getMonth() === today.getMonth() && msgDate.getFullYear() === today.getFullYear()
  })

  return {
    total: messages.length,
    thisMonth: thisMonth.length,
    lastMessage: messages.length > 0 ? messages[0].date : "Ninguno",
  }
}

// Exportar datos (para backup)
function exportMessages() {
  const dataStr = JSON.stringify(messages, null, 2)
  const dataBlob = new Blob([dataStr], { type: "application/json" })
  const url = URL.createObjectURL(dataBlob)

  const link = document.createElement("a")
  link.href = url
  link.download = `mensajes-contacto-${new Date().toISOString().split("T")[0]}.json`
  link.click()

  URL.revokeObjectURL(url)
  showNotification("Mensajes exportados correctamente.", "success")
}

// Importar datos
function importMessages(event) {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const importedMessages = JSON.parse(e.target.result)
      if (Array.isArray(importedMessages)) {
        messages = importedMessages
        localStorage.setItem("contactMessages", JSON.stringify(messages))
        loadMessages()
        showNotification("Mensajes importados correctamente.", "success")
      } else {
        throw new Error("Formato de archivo inválido")
      }
    } catch (error) {
      showNotification("Error al importar mensajes. Verifica el formato del archivo.", "error")
    }
  }
  reader.readAsText(file)
}

// Función para debugging (solo en desarrollo)
function debugInfo() {
  console.log("=== DEBUG INFO ===")
  console.log("Total messages:", messages.length)
  console.log("Messages:", messages)
  console.log("Stats:", getMessageStats())
  console.log("==================")
}

// Hacer algunas funciones globales para uso en HTML
window.deleteMessage = deleteMessage
window.clearAllMessages = clearAllMessages
window.showAdminAccess = showAdminAccess
window.toggleAdminPanel = toggleAdminPanel
window.exportMessages = exportMessages
window.importMessages = importMessages
window.debugInfo = debugInfo
