<%inherit file="myapp:templates/template.mako" />
<%def name="title()">Help</%def>
<%def name="head()">
<link href="${request.static_url('myapp:static/css/help.css')}" rel="stylesheet">
<script>
</script></%def>
<%def name="body()">
<div class="container template" >
    <ul class="collapsible" data-collapsible="expandable">
    <li>
        <div class="collapsible-header">
            <i class="material-icons">question_answer</i>
            <span> How do I bid on an item?</span>
        </div>
        <div class="collapsible-body"><p>Search up an item. Then click on see more auctions for this item. Select the auction that you would like to partake in and select bid. Then put in the amount you want to bid. That's it!</p></div>
    </li>
       <li>
        <div class="collapsible-header">
            <i class="material-icons">question_answer</i>
            <span> How Do I make an auction?</span>  
        </div>
        <div class="collapsible-body"><p>Make sure you are logged. Then, in your home screen in the lower right side there is a pencil icon. Click on that icon and fill in your item data.</p></div>
    </li>
          <li>
        <div class="collapsible-header">
            <i class="material-icons">question_answer</i>
            <span> In my auction history, why are some of my auctions grey and the other auctions white?</span>  
        </div>
        <div class="collapsible-body"><p>The grey cards indicate that the auction is closed and completed, whit cards indicate that the auction is still on going.</p></div>
    </li>
    <li>
        <div class="collapsible-header">
            <i class="material-icons">question_answer</i>
            <span>What happens if an item doesn't sell?</span>
        </div>
        <div class="collapsible-body">
            <p>The auction is marked as complete. No on one loses any money and you keep your item.</p>
        </div>
    </li>
    <li>
         <div class="collapsible-header">
            <i class="material-icons">question_answer</i>
            <span>Where can I view am item's bid history?</span>
        </div>
        <div class="collapsible-body">
            <p>When you look up an item, you can see all the auctions that it is a part of. Once you chose your specific auction, there will be a button to see bid history for the item. </p>
        </div>
    </li>
     <li>
         <div class="collapsible-header">
            <i class="material-icons">question_answer</i>
            <span>How can I look up other customers?</span>
        </div>
        <div class="collapsible-body">
            <p> If you see a customer you are interested in throughout an auction, simply click on their profile to see their stats and the auctions they took part in.</p>
        </div>
    </li>
     <li>
         <div class="collapsible-header">
            <i class="material-icons">question_answer</i>
            <span>What happens if no one meets the reserve amount?</span>
        </div>
        <div class="collapsible-body">
            <p>Your auction will simply end and the item returns to you.</p>
        </div>
    </li>
     <li>
         <div class="collapsible-header">
            <i class="material-icons">question_answer</i>
            <span>I put in the wrong information in my profile account, what do I do?</span>
        </div>
        <div class="collapsible-body">
            <p>Don't worry! Simply select edit and submit your changes. Your profile will be updated </p>
        </div>
    </li>
     <li>
         <div class="collapsible-header">
            <i class="material-icons">question_answer</i>
            <span>Who can bid on my auction?</span>
        </div>
        <div class="collapsible-body">
            <p>Anyone who is interested in the item you put up for sale can bid. </p>
        </div>
    </li>
     <li>
         <div class="collapsible-header">
           <i class="material-icons">question_answer</i>
            <span>How does the rating system work?</span>
        </div>
        <div class="collapsible-body">
            <p>Everyone starts with 3 stars. Then based on how their peers rate them it can go up or down. Maximum is 5 minimum is 0 </p>
        </div>
    </li>
     <li>
         <div class="collapsible-header">
            <i class="material-icons">question_answer</i>
            <span> I wanted an item but the Bid button is disabled, what does that mean?</span>
        </div>
        <div class="collapsible-body">
            <p> Unfortunately it means the auction is closed, that item is no longer uo for bidding. You can always search up an item and find more open auctions, though! </p>
        </div>
    </li>
     <li>
         <div class="collapsible-header">
            <i class="material-icons">question_answer</i>
            <span>Where do my suggested items come from?</span>
        </div>
        <div class="collapsible-body">
            <p>To enhance your experience, we keep track of your searches and suggest items for you based on things you search up often. </p>
        </div>
    </li>
    </ul>
    
</div>
</%def>
<%def name="scripts()">
<script type="text/babel" src="${request.static_url('myapp:static/js/home.jsx')}"></script>
</%def>
