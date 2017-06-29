"use strict"
$(document).ready(function(){

	function Player(){
		var self=this;
		self.stake=false;
		self.cardsweight=0;
		self.cardsweight_oponent=0;
		self.points=0;
		self.points_oponent=0;
		self.sum=0;
		self.sum_oponent=0;
	}

	Player.prototype.doingStake=function(){
		var self=this;
		$("#sel").on("click",function(){
		if($("#sel").val()!=0){
			self.stake=true;
			$("#bank").find("span").text($("#sel").val()*2);
		}else{
			$("#bank").find("span").text(0);
		}

		});
		
	}
	
	Player.prototype.distribute=function(){
		var self=this;
		$("#distrib").click(function(){
		if (self.stake===true){
			var pos1=Math.floor(Math.random()*50+1);
			var pos2=Math.floor(Math.random()*50+1);
			$("#cardsbody").find("div").each(function(){
			if($(this).data("position")===pos1){
				self.cardsweight+=$(this).data("weight");
			$(this).appendTo("#cardstable");
			$(this).fadeIn(600);
			$("#oponentcard").appendTo("#oponenttable");
			$("#oponentcard").fadeIn(600);
			}else if($(this).data("position")===pos2){
				self.cardsweight+=$(this).data("weight");
			$(this).appendTo("#cardstable");
			$(this).fadeIn(600);
			$("#oponentcard2").appendTo("#oponenttable");
			$("#oponentcard2").fadeIn(600);
			}
		});

		}else{
				alert("Сделайте ставку!");
			}
			
		});
		
		
	}

	Player.prototype.distributeoponent=function(){
		var self=this;
		$("#distrib").click(function(){
			var oponpos1=Math.floor(Math.random()*50+1);
			var oponpos2=Math.floor(Math.random()*50+1);
			$("#cardsbody").find("div").each(function(){
			if($(this).data("position")===oponpos1){
				self.cardsweight_oponent+=$(this).data("weight");
				$(this).appendTo("#oponenttable");
				$(this).hide();
			}else if($(this).data("position")===oponpos2){
				self.cardsweight_oponent+=$(this).data("weight");
				$(this).appendTo("#oponenttable");
				$(this).hide();
				}	
			});
		});
		
	}

	Player.prototype.takecard=function(){
		var self=this;
		$("#takecard").click(function(){
			var pos3=Math.floor(Math.random()*50+1);
			$("#cardsbody").find("div").each(function(){
			if($(this).data("position")===pos3){
				self.cardsweight+=$(this).data("weight");
			$(this).appendTo("#cardstable");
			$(this).fadeIn(600);
		 	}
		});
			$("#oponentcard3").appendTo("#oponenttable");
			$("#oponentcard3").fadeIn(600);

		});

	}

	Player.prototype.takecardoponent=function(){
		var self=this;
		$("#takecard").click(function(){
			var oponpos3=Math.floor(Math.random()*50+1);
			$("#cardsbody").find("div").each(function(){
				if($(this).data("position")===oponpos3){
					self.cardsweight_oponent+=$(this).data("weight");
				$(this).appendTo("#oponenttable");
				$(this).hide();
			}
		});


		});

	}

	Player.prototype.skipwinner=function(){
		var self=this;
		$("#skip").click(function(){
			if ((self.cardsweight<21)&&(self.cardsweight_oponent<21)&&(self.cardsweight>self.cardsweight_oponent)){
				self.points+=1;
				self.sum+=+$("#sel").val();
				self.points_oponent-=1;
				self.sum_oponent-=+$("#sel").val();
			}else if ((self.cardsweight<21)&&(self.cardsweight_oponent<21)&&(self.cardsweight<self.cardsweight_oponent)){
				self.points_oponent+=1;
				self.sum_oponent+=+$("#sel").val();
				self.points-=1;
				self.sum-=+$("#sel").val();
			}else if ((self.cardsweight<21)&&(self.cardsweight_oponent<21)&&(self.cardsweight===self.cardsweight_oponent)){
				self.points_oponent+=0;
				self.sum_oponent+=0;
				self.points+=0;
				self.sum+=0;
			}else if((self.cardsweight===21)&&(self.cardsweight!=self.cardsweight_oponent)){
				self.points+=1;
				self.sum+=+$("#sel").val();
				self.points_oponent-=1;
				self.sum_oponent-=+$("#sel").val();
			}else if((self.cardsweight===21)&&(self.cardsweight_oponent===21)){
				self.points+=0;
				self.sum+=0;
				self.points_oponent+=0;
				self.sum_oponent+=0;
			}else if ((self.cardsweight>21)&&(self.cardsweight_oponent<21)){
				self.points-=1;
				self.sum-=+$("#sel").val();
				self.points_oponent+=1;
				self.sum_oponent+=+$("#sel").val();
			}else if ((self.cardsweight<21)&&(self.cardsweight_oponent>21)){
				self.points+=1;
				self.sum+=+$("#sel").val();
				self.points_oponent-=1;
				self.sum_oponent-=+$("#sel").val();
			}else if ((self.cardsweight>21)&&(self.cardsweight_oponent===21)){
				self.points-=1;
				self.sum-=+$("#sel").val();
				self.points_oponent+=1;
				self.sum_oponent+=+$("#sel").val();
			}else{
				self.points-=1;
				self.sum-=+$("#sel").val();
				self.points_oponent-=1;
				self.sum_oponent-=+$("#sel").val();
			}
			$("#oponentcard,#oponentcard2,#oponentcard3").appendTo("#oponcards");
			$("#oponenttable").find("div").each(function(){
			$(this).show();
		});

		});	
	}
	Player.prototype.cleartable=function(){
		var self=this;
		$("#cleartable").click(function(){
			$("#sum").find("span").text(+self.sum);
			$("#oponenttable,#cardstable").find("div").each(function(){
				$(this).appendTo("#cardsbody");
				$(this).hide();
				self.cardsweight=0;
				self.cardsweight_oponent=0;
			});

		});
	}


	var player=new Player();
	
	player.doingStake();
	player.distribute();
	player.distributeoponent();
	player.takecard();
	player.takecardoponent();
	player.skipwinner();
	player.cleartable();
	

	console.dir(player);

	

});