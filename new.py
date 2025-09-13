import tkinter as tk
from tkinter import messagebox, ttk
import sqlite3

# ---------------- DATABASE ----------------
conn = sqlite3.connect("students.db")
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS students(
id INTEGER PRIMARY KEY,
roll_number TEXT,
name TEXT,
email TEXT,
gender TEXT,
marks INTEGER
)
""")
conn.commit()

# ---------------- DSA ----------------
class Student:   # DSA
    def __init__(self, id, roll, name, email, gender, marks):
        self.id = id
        self.roll = roll
        self.name = name
        self.email = email
        self.gender = gender
        self.marks = marks

# DSA: Quick Sort by Marks
def quick_sort(arr):   # DSA
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr)//2].marks
    left = [x for x in arr if x.marks < pivot]
    mid = [x for x in arr if x.marks == pivot]
    right = [x for x in arr if x.marks > pivot]
    return quick_sort(left) + mid + quick_sort(right)

# DSA: Binary Search by ID
def binary_search(arr, target_id):   # DSA
    low, high = 0, len(arr)-1
    while low <= high:
        mid = (low + high)//2
        if arr[mid].id == target_id:
            return arr[mid]
        elif arr[mid].id < target_id:
            low = mid + 1
        else:
            high = mid - 1
    return None

# ---------------- FUNCTIONS ----------------
def add_student():
    if not id_var.get() or not roll_var.get() or not name_var.get() or not marks_var.get():
        messagebox.showerror("Error", "ID, Roll No, Name, and Marks are required!")
        return
    try:
        cursor.execute("INSERT INTO students (id, roll_number, name, email, gender, marks) VALUES (?,?,?,?,?,?)",
                       (id_var.get(), roll_var.get(), name_var.get(), email_var.get(), gender_var.get(), marks_var.get()))
        conn.commit()
        show_students()
        clear_form()
    except sqlite3.IntegrityError:
        messagebox.showerror("Error", "This Student ID already exists!")

def update_student():
    selected = tree.focus()
    if not selected:
        messagebox.showerror("Error", "Select a student to update")
        return
    values = tree.item(selected, "values")
    cursor.execute("""UPDATE students
SET roll_number=?, name=?, email=?, gender=?, marks=?
        WHERE id=?""",
        (roll_var.get(), name_var.get(), email_var.get(), gender_var.get(), marks_var.get(), values[0]))
    conn.commit()
    show_students()
    clear_form()

def delete_student():
    selected = tree.focus()
    if not selected:
        messagebox.showerror("Error", "Select a student to delete")
        return
    values = tree.item(selected, "values")
    cursor.execute("DELETE FROM students WHERE id=?", (values[0],))
    conn.commit()
    show_students()
    clear_form()

def show_students():
    for row in tree.get_children():
        tree.delete(row)
    cursor.execute("SELECT * FROM students")
    for row in cursor.fetchall():
        tree.insert("", tk.END, values=row)

def clear_form():
    id_var.set("")
    roll_var.set("")
    name_var.set("")
    email_var.set("")
    gender_var.set("")
    marks_var.set("")

# DSA: Binary Search used for searching
def search_student():
    try:
        target_id = int(search_var.get())
    except:
        messagebox.showerror("Error", "Enter a valid Student ID")
        return

    cursor.execute("SELECT * FROM students ORDER BY id")
    rows = cursor.fetchall()
    students = [Student(*row) for row in rows]   # DSA

    result = binary_search(students, target_id)   # DSA
    if result:
        messagebox.showinfo("Student Found",
                            f"ID: {result.id}\nRoll No: {result.roll}\nName: {result.name}\nEmail: {result.email}\nGender: {result.gender}\nMarks: {result.marks}")
    else:
        messagebox.showwarning("Not Found", "No student with this ID")

# DSA: Quick Sort used for sorting
def sort_by_marks():   # DSA
    cursor.execute("SELECT * FROM students")
    rows = cursor.fetchall()
    students = [Student(*row) for row in rows]   # DSA
    sorted_students = quick_sort(students)       # DSA

    for row in tree.get_children():
        tree.delete(row)
    for st in sorted_students:
        tree.insert("", tk.END, values=(st.id, st.roll, st.name, st.email, st.gender, st.marks))

def on_tree_select(event):
    selected = tree.focus()
    if selected:
        values = tree.item(selected, "values")
        id_var.set(values[0])
        roll_var.set(values[1])
        name_var.set(values[2])
        email_var.set(values[3])
        gender_var.set(values[4])
        marks_var.set(values[5])

# ---------------- GUI ----------------
root = tk.Tk()
root.title("Student Record Management System ")
root.geometry("900x650")

# Variables
id_var = tk.IntVar()
roll_var = tk.StringVar()
name_var = tk.StringVar()
email_var = tk.StringVar()
gender_var = tk.StringVar()
marks_var = tk.IntVar()
search_var = tk.StringVar()

# Form Frame
form_frame = tk.Frame(root)
form_frame.pack(pady=10)

tk.Label(form_frame, text="Student ID").grid(row=0, column=0, padx=10, pady=5)
tk.Entry(form_frame, textvariable=id_var).grid(row=0, column=1)

tk.Label(form_frame, text="Roll Number").grid(row=1, column=0, padx=10, pady=5)
tk.Entry(form_frame, textvariable=roll_var).grid(row=1, column=1)

tk.Label(form_frame, text="Name").grid(row=2, column=0, padx=10, pady=5)
tk.Entry(form_frame, textvariable=name_var).grid(row=2, column=1)

tk.Label(form_frame, text="Email").grid(row=3, column=0, padx=10, pady=5)
tk.Entry(form_frame, textvariable=email_var).grid(row=3, column=1)

tk.Label(form_frame, text="Gender").grid(row=4, column=0, padx=10, pady=5)
tk.Entry(form_frame, textvariable=gender_var).grid(row=4, column=1)

tk.Label(form_frame, text="Marks").grid(row=5, column=0, padx=10, pady=5)
tk.Entry(form_frame, textvariable=marks_var).grid(row=5, column=1)

# Buttons
btn_frame = tk.Frame(root)
btn_frame.pack(pady=10)

tk.Button(btn_frame, text="Add Student", command=add_student).grid(row=0, column=0, padx=10)
tk.Button(btn_frame, text="Update Student", command=update_student).grid(row=0, column=1, padx=10)
tk.Button(btn_frame, text="Delete Student", command=delete_student).grid(row=0, column=2, padx=10)
tk.Button(btn_frame, text="Clear", command=clear_form).grid(row=0, column=3, padx=10)
tk.Button(btn_frame, text="Sort by Marks ", command=sort_by_marks).grid(row=0, column=4, padx=10)

# Search
search_frame = tk.Frame(root)
search_frame.pack(pady=10)

tk.Entry(search_frame, textvariable=search_var, width=10).pack(side=tk.LEFT, padx=10)
tk.Button(search_frame, text="Search by ID ", command=search_student).pack(side=tk.LEFT, padx=10)

# Table
tree = ttk.Treeview(root, columns=("ID", "Roll No", "Name", "Email", "Gender", "Marks"), show="headings")
for col in ("ID", "Roll No", "Name", "Email", "Gender", "Marks"):
    tree.heading(col, text=col)
tree.pack(fill=tk.BOTH, expand=True, pady=20)

tree.bind("<<TreeviewSelect>>", on_tree_select)

# Show initial data
show_students()

root.mainloop()