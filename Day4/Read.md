# mongoose ek ODM (Object Data Modeling) library hai jo MongoDB ke sath kaam karne ke liye use hoti hai.
# Ye code MongoDB database ko Node.js server se connect karne ke liye likha gaya hai.

# Step-by-step:
# 1. Mongoose ko import karo
# 2. Ek MongoDB URI chahiye (connection string) — ise actual string se replace karna hoga
# 3. connectToDB() function ke andar mongoose.connect use kiya gaya hai
# 4. Agar connection ho jaye to success message aata hai
# 5. Agar error aaye to catch block me error handle hota hai

# do tarike hain connect karne ke:
# 1. .then().catch() (Promise based)
# 2. async/await + try...catch (modern & readable)
