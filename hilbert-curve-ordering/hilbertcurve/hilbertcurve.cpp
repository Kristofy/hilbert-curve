#include <iostream>
#include <math.h>
#include <utility>
#include <vector>
#include <algorithm>

using namespace std;

inline int pos(const int&, const int&);

struct Pont {
	int x, y;

	friend bool operator<(const Pont& a, const Pont& b);
	Pont operator-(const Pont& b) {
		return Pont{ x - b.x, y - b.y };
	}
};

bool operator<(const Pont& a, const Pont& b) {
	return a.x < b.x;
}

vector <pair<string, Pont>> sorozat;
int level;
struct Node {
	bool reserved = false;
	bool added = false;
	Pont point;
	Node* nodes;
	int lastindex;
	void insert(Pont pont, int szint, int index) {
		if (reserved) {
			
			if (!added) {
				nodes = new Node[4];
				int lastx = point.x / (1 << szint);
				int lasty = point.y / (1 << szint);
				sorozat[lastindex].first += (char)( pos(lastx, lasty)+48);
				point.x -= (1 << szint) * (lastx == 1);
				point.y -= (1 << szint) * (lasty == 1);

				nodes[point.y/ (1 << szint) * 2 + point.x/ (1 << szint)].insert(point, szint - 1, lastindex);
				added = true;
			}
			
			int x = pont.x / (1 << szint);
			int y = pont.y / (1 << szint);

			sorozat[index].first += (char)(pos(x,y)+48);
			pont.x -= (1 << szint)*(x==1);
			pont.y -= (1 << szint)*(y==1);
			nodes[y * 2 + x].insert(pont, szint - 1, index);

		}
		else {
			point = pont;
			lastindex = index;
			reserved = true;
		}
	}

};

struct Quadtree {
	Node nodes[2][2];
	void insert(Pont pont) {
		int x = pont.x / ((1 << level)>>1);
		int y = pont.y / ((1 << level)>>1);
		sorozat.push_back(make_pair(string(1, pos(x,y)+48), pont));
		pont.x -= ((1 << level) >> 1)* (x == 1);
		pont.y -= ((1 << level) >> 1)* (y == 1);
		nodes[y][x].insert(pont, level - 1, sorozat.size() - 1);
	}
};

inline int pos(const int& x, const int& y) {
	if (x && y)return 2;
	if (y) return 1;
	if (x) return 3;
	return 0;
}



int main()
{
	int szint, pontok_szama;
	cin >> szint >> pontok_szama;
	Quadtree quadtree;
	level = szint;
	int x, y;
	sorozat.reserve(pontok_szama);
	for (int i = 0; i < pontok_szama; i++) {
		cin >> x >> y;

		quadtree.insert({ x,y });
	}

	sort(sorozat.begin(), sorozat.end());
	for (int i = 0; i < pontok_szama; i++) {
		cout << sorozat[i].second.x << " " << sorozat[i].second.y << endl;
	}

	return 0;
}
