// لما المستخدم يضغط على زر عرض البيانات
document.getElementById("currencyForm").addEventListener("submit", function(e) {
    e.preventDefault();
  
    const coin = document.getElementById("coin").value;
    const resultDiv = document.getElementById("result");
  
    if (!coin) {
      resultDiv.innerHTML = "<p>الرجاء اختيار عملة</p>";
      return;
    }
  
    // نطلب بيانات العملة من CoinGecko
    fetch(`https://api.coingecko.com/api/v3/coins/${coin}`)
      .then(response => response.json())
      .then(data => {
        const price = data.market_data.current_price.usd;
        const high = data.market_data.high_24h.usd;
        const change = data.market_data.price_change_percentage_24h;
        const marketCap = data.market_data.market_cap.usd;
        const symbol = data.symbol.toUpperCase();
  
        // لعرض البيانات على الصفحة
        resultDiv.innerHTML = `<h2>${data.name} (${symbol})</h2>
            <p><strong>السعر الان:</strong> $${price}</p>
            <p><strong>أعلى سعر خلال 24 ساعة:</strong> $${high}</p>
            <p><strong>التغير اليومي:</strong> ${change}%</p>
            <p><strong>القيمة السوقية:</strong> $${marketCap}</p>`;
      })
      .catch(error => {
        resultDiv.innerHTML = "<p>حدث خطأ أثناء تحميل البيانات</p>";
      });
  });
  
  // زر لمسح البيانات المعروضة
  document.getElementById("clearBtn").addEventListener("click", function() {
    document.getElementById("result").innerHTML = "";
  });
  